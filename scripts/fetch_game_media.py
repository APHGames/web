# -*- coding: utf-8 -*-
"""Download extra covers, posters and screenshots for the magazine pages.

Writes src/internals/worthwhile-media.json and static/img/worthwhile-games/media/.
Does not rewrite worthwhile-games.json.

    python -u scripts/fetch_game_media.py
    python -u scripts/fetch_game_media.py 77
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.parse
from pathlib import Path

import build_worthwhile_catalog as cat

ROOT = Path(__file__).resolve().parents[1]
GAMES_JSON = ROOT / "src" / "internals" / "worthwhile-games.json"
MEDIA_JSON = ROOT / "src" / "internals" / "worthwhile-media.json"
CACHE = ROOT / "scripts" / "game-notes" / "wiki-cache.json"
MEDIA_DIR = ROOT / "static" / "img" / "worthwhile-games" / "media"

COVER_RE = re.compile(r"box ?art|boxart|boxshot|box-shot|boxcover|boxscan|coverart|cover|package", re.I)
POSTER_RE = re.compile(r"poster|flyer", re.I)
ART_RE = re.compile(r"concept art|conceptart|artwork|illustration", re.I)
SHOT_RE = re.compile(
    r"gameplay|game-play|in-?game|screenshot|screen_shot|title ?screen|titlescreen",
    re.I,
)
REJECT_RE = re.compile(
    r"logo|icon|wordmark|portrait|headshot|cosplay|comic con|controller|gamepad|"
    r"joystick|cabinet|cartridge|\bconsole\b|\bcoin\b|currency|conference|"
    r"\(cropped|sprite|map icon|font|texture|button|banner|wallpaper|concept",
    re.I,
)


def load_json(path: Path, default):
    if not path.exists():
        return default
    for _ in range(3):
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            time.sleep(0.4)
    return default


def save_media(media: dict) -> None:
    tmp = MEDIA_JSON.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(media, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(MEDIA_JSON)


def wiki_title(game: dict, cache: dict) -> str:
    cached = (cache.get(str(game["id"])) or {}).get("enTitle") or ""
    if cached and "may refer" not in cached.lower():
        return cached
    bare = re.sub(r"\s*\([^)]*\)\s*$", "", game["name"]).strip()
    return bare


def classify(filename: str, tokens: list[str]) -> str | None:
    if not re.search(r"\.(png|jpe?g|gif|webp)$", filename, re.I):
        return None
    mentions = any(token in filename.lower() for token in tokens if len(token) >= 4)
    if not mentions:
        return None
    if POSTER_RE.search(filename):
        return "poster"
    if COVER_RE.search(filename):
        return "cover"
    if ART_RE.search(filename):
        return "artwork"
    if REJECT_RE.search(filename):
        return None
    mentions = any(token in filename.lower() for token in tokens if len(token) >= 4)
    if SHOT_RE.search(filename) or mentions:
        return "screenshot"
    return None


def already_used(game: dict, title: str) -> bool:
    source = (game.get("imageSource") or "").lower()
    needle = title.split(":", 1)[-1].replace(" ", "_").lower()
    return bool(needle) and needle in source


def pick_files(files: list[str], tokens: list[str], game: dict) -> list[tuple[str, str]]:
    covers, posters, arts, shots = [], [], [], []
    for title in files:
        if already_used(game, title):
            continue
        kind = classify(title, tokens)
        if kind == "cover":
            covers.append(title)
        elif kind == "poster":
            posters.append(title)
        elif kind == "artwork":
            arts.append(title)
        elif kind == "screenshot":
            shots.append(title)
    chosen = []
    if covers:
        chosen.append((covers[0], "cover"))
    if posters:
        chosen.append((posters[0], "poster"))
    if arts:
        chosen.append((arts[0], "artwork"))
    for title in shots[:3]:
        chosen.append((title, "screenshot"))
    return chosen


def commons_named(name: str, hint: str) -> list[str]:
    params = urllib.parse.urlencode({
        "action": "query",
        "list": "search",
        "srsearch": f"{name} {hint}",
        "srnamespace": "6",
        "srlimit": "8",
        "format": "json",
    })
    try:
        data = cat.http_json("https://commons.wikimedia.org/w/api.php?" + params)
    except Exception as err:  # noqa: BLE001
        print(f"  commons search failed for {name}: {err}")
        return []
    time.sleep(0.45)
    found = []
    for hit in data.get("query", {}).get("search", []):
        title = hit.get("title") or ""
        if title and not title.startswith("File:"):
            title = "File:" + title
        if title:
            found.append(title)
    return found


def steam_cover(name: str, year: int) -> dict | None:
    query = urllib.parse.urlencode({"term": name, "l": "english", "cc": "us"})
    try:
        data = cat.http_json(f"https://store.steampowered.com/api/storesearch/?{query}")
    except Exception as err:  # noqa: BLE001
        print(f"  steam search failed: {err}")
        return None
    time.sleep(0.4)
    wanted = cat.collapsed_name(name)
    for item in (data.get("items") or [])[:8]:
        kind = cat.steam_match_kind(cat.collapsed_name(item.get("name") or ""), wanted)
        if not kind:
            continue
        appid = item.get("id")
        try:
            detail = cat.http_json(f"https://store.steampowered.com/api/appdetails?appids={appid}&l=english")
        except Exception:
            continue
        time.sleep(0.4)
        block = (detail.get(str(appid)) or {}).get("data") or {}
        release = ((block.get("release_date") or {}).get("date") or "")
        match = re.search(r"(19|20)\d{2}", release)
        limit = 30 if kind == "edition" else 10
        if not match or abs(int(match.group(0)) - year) > limit:
            continue
        header = block.get("header_image")
        if not header:
            continue
        return {
            "url": header,
            "source": f"https://store.steampowered.com/app/{appid}",
            "license": "Steam store",
        }
    return None


def store_image(raw: bytes, gid: int, kind: str, index: int) -> dict | None:
    try:
        image, pixelated = cat.process_image(raw)
    except Exception as err:  # noqa: BLE001
        print(f"  decode failed: {err}")
        return None
    MEDIA_DIR.mkdir(parents=True, exist_ok=True)
    width, height = image.size
    if pixelated:
        path = MEDIA_DIR / f"{gid:03d}-{kind}-{index}.png"
        image.save(path, "PNG")
    else:
        path = MEDIA_DIR / f"{gid:03d}-{kind}-{index}.jpg"
        image.convert("RGB").save(path, "JPEG", quality=86, optimize=True)
    return {
        "src": f"/img/worthwhile-games/media/{path.name}",
        "kind": kind,
        "pixelated": pixelated,
        "width": width,
        "height": height,
    }


def base_shot(game: dict) -> dict | None:
    if not game.get("image"):
        return None
    return {
        "src": game["image"],
        "kind": "screenshot",
        "pixelated": bool(game.get("pixelated")),
        "width": game.get("imageWidth") or 0,
        "height": game.get("imageHeight") or 0,
        "source": game.get("imageSource"),
        "license": game.get("imageLicense"),
    }


def enrich_game(game: dict, cache: dict) -> list[dict]:
    items = []
    shot = base_shot(game)
    if shot:
        items.append(shot)
    bare = re.sub(r"\s*\([^)]*\)\s*$", "", game["name"]).strip()
    tokens = cat.name_tokens(bare)
    title = wiki_title(game, cache)
    try:
        files = cat.page_images_one(title)
    except Exception as err:  # noqa: BLE001
        print(f"  wiki images failed: {err}")
        files = []
    if len(files) < 8:
        files = list(dict.fromkeys(
            files
            + commons_named(bare, "gameplay screenshot")
            + commons_named(bare, "box art cover poster")
        ))
    chosen = pick_files(files, tokens, game)
    infos = {}
    if chosen:
        try:
            infos = cat.image_infos([item[0] for item in chosen])
        except Exception as err:  # noqa: BLE001
            print(f"  imageinfo failed: {err}")
    index = 1
    have_cover = False
    for file_title, kind in chosen:
        info = infos.get(file_title) or {}
        if not info.get("url") or not cat.usable_dimensions(info):
            continue
        if kind == "cover":
            have_cover = True
        try:
            raw = cat.http_bytes(info["url"])
        except Exception as err:  # noqa: BLE001
            print(f"  download failed {file_title}: {err}")
            continue
        saved = store_image(raw, game["id"], kind, index)
        if not saved:
            continue
        saved["source"] = info.get("page")
        saved["license"] = info.get("license") or "Wikimedia"
        items.append(saved)
        index += 1
    if not have_cover:
        cover = steam_cover(bare, int(game["year"]))
        if cover and cover.get("url"):
            try:
                raw = cat.http_bytes(cover["url"])
                saved = store_image(raw, game["id"], "cover", index)
                if saved:
                    saved["source"] = cover["source"]
                    saved["license"] = cover["license"]
                    items.append(saved)
            except Exception as err:  # noqa: BLE001
                print(f"  steam cover failed: {err}")
    return items


def main() -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    only = {int(part) for part in sys.argv[1].split(",")} if len(sys.argv) > 1 else None
    games = load_json(GAMES_JSON, [])
    media = load_json(MEDIA_JSON, {})
    done = 0
    for game in games:
        gid = game["id"]
        if only and gid not in only:
            continue
        key = str(gid)
        existing = media.get(key) or []
        if not only and existing:
            continue
        cache = load_json(CACHE, {})
        items = enrich_game(game, cache)
        media[key] = items
        done += 1
        print(f"[{done}] {gid} {game['name']} images={len(items)}", flush=True)
        if done % 8 == 0:
            save_media(media)
    save_media(media)
    print("saved", MEDIA_JSON)


if __name__ == "__main__":
    main()
