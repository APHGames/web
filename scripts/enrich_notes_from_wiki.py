# -*- coding: utf-8 -*-
"""Pull longer bilingual notes for each game from Wikipedia and merge them
with the lecture notes already written under scripts/game-notes/.
"""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAMES = ROOT / "src" / "internals" / "worthwhile-games.json"
NOTES_DIR = ROOT / "scripts" / "game-notes"
CACHE = NOTES_DIR / "wiki-cache.json"
UA = "APHGamesWorthwhileCatalog/1.0 (https://aphgames.io; educational catalog; local notes)"

WIKI_OVERRIDES = {
    9: "Combat (video game)",
    51: "King's Quest I",
    77: "Arkanoid",
    103: "Ninja Gaiden (NES)",
    129: "Neverwinter Nights (1991 video game)",
    203: "Pokémon Red and Blue",
    204: "Civilization II",
    214: "Broken Sword: The Shadow of the Templars",
    230: "Final Fantasy Tactics",
    255: "Dance Dance Revolution (1998 video game)",
    264: "Soulcalibur (video game)",
    276: "Street Fighter III: 3rd Strike",
    304: "Final Fantasy X",
    313: "Neverwinter Nights",
    320: "Star Wars: Knights of the Old Republic",
    329: "Disgaea: Hour of Darkness",
    335: "Grand Theft Auto: San Andreas",
    337: "Metal Gear Solid 3: Snake Eater",
    340: "Ninja Gaiden (2004 video game)",
}

SKIP = re.compile(
    r"may refer to|může odkazovat|this disambiguation|coordinates:|"
    r"\[edit\]|citation needed|chybí zdroj|viz též|see also|"
    r"external links|externí odkazy|references|poznámky|"
    r"categories:|kategorie:",
    re.I,
)


def http_json(url: str) -> dict:
    delay = 2.0
    for attempt in range(6):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=45) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception as err:
            code = getattr(err, "code", None)
            if attempt == 5:
                raise
            wait = 12 if code == 429 else delay
            print(f"  retry {code or err} in {wait:.0f}s", flush=True)
            time.sleep(wait)
            delay = min(delay * 2, 30)
    return {}


def wiki_api(lang: str, params: dict) -> dict:
    params = {"format": "json", **params}
    url = f"https://{lang}.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    data = http_json(url)
    time.sleep(0.45)
    return data


def strip_wiki(text: str) -> str:
    text = re.sub(r"<ref[^>]*>.*?</ref>", " ", text, flags=re.S | re.I)
    text = re.sub(r"<ref[^>]*/>", " ", text, flags=re.I)
    for _ in range(40):
        nxt = re.sub(r"\{\{[^{}]*\}\}", " ", text)
        if nxt == text:
            break
        text = nxt
    text = re.sub(r"\{\{[^{}]*\}\}", " ", text)
    text = re.sub(r"\[\[(?:File|Image|Soubor|Fichier):[^\]]+\]\]", " ", text, flags=re.I)
    text = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\[https?://[^\s\]]+\s+([^\]]+)\]", r"\1", text)
    text = re.sub(r"\[https?://[^\]]+\]", " ", text)
    text = re.sub(r"={2,}\s*([^=]+?)\s*={2,}", r" \1. ", text)
    text = re.sub(r"''+", "", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"(?m)^[\*\#:;].*$", " ", text)
    text = re.sub(r"(?m)^\|.*$", " ", text)
    return text


def page_extract(lang: str, title: str) -> tuple[str, str]:
    data = wiki_api(lang, {
        "action": "parse",
        "page": title,
        "prop": "wikitext",
        "redirects": "1",
    })
    if data.get("error"):
        return "", title
    parsed = data.get("parse") or {}
    wikitext = ((parsed.get("wikitext") or {}).get("*")) or ""
    resolved = parsed.get("title") or title
    return strip_wiki(wikitext), resolved


def title_fits(title: str, name: str) -> bool:
    base = title.split("(", 1)[0]
    got = re.sub(r"[^a-z0-9]", "", base.lower())
    wanted = re.sub(r"[^a-z0-9]", "", re.sub(r"\s*\([^)]*\)\s*$", "", name).lower())
    if not got or not wanted:
        return False
    if got == wanted:
        return True
    if got.startswith(wanted) and ":" in title:
        return True
    return False


def looks_like_game(text: str, title: str) -> bool:
    if len(text) < 400:
        return False
    blob = f"{title}\n{text[:2500]}".lower()
    if "may refer to" in blob or "může odkazovat" in blob:
        return False
    markers = (
        "video game", "arcade game", "computer game", "videohra",
        "počítačová hra", "arkádová", "hru z roku",
    )
    return any(marker in blob for marker in markers)


def accept_article(
    text: str,
    title: str,
    name: str,
    year: int,
    override: bool = False,
    requested: str = "",
) -> bool:
    if not looks_like_game(text, title):
        return False
    if override:
        return True
    asked = requested or name
    named = name.lower() in text[:3000].lower()
    if title_fits(title, name) or (title_fits(asked, name) and named):
        if "video game" not in title.lower() and "videohra" not in title.lower() and str(year) not in text[:4500]:
            return False
        if not title_fits(title, name) and "video game" not in title.lower() and "videohra" not in title.lower():
            return False
        return True
    return False


def accept_cs(text: str, title: str, year: int) -> bool:
    return bool(text) and looks_like_game(text, title) and str(year) in text


def search_title(lang: str, name: str, year: int) -> str:
    hint = "video game" if lang == "en" else "videohra"
    data = wiki_api(lang, {
        "action": "query",
        "list": "search",
        "srsearch": f"\"{name}\" {year} {hint}",
        "srlimit": "6",
    })
    hits = (data.get("query") or {}).get("search") or []
    fitting = []
    loose = []
    for hit in hits:
        title = hit.get("title") or ""
        if title_fits(title, name):
            fitting.append(title)
        elif "video game" in title.lower() or "videohra" in title.lower():
            loose.append(title)
    pool = fitting or loose
    for title in pool:
        if "video game" in title.lower() or "videohra" in title.lower():
            return title
    return pool[0] if pool else ""


def sentences(text: str) -> list[str]:
    text = re.sub(r"==+[^=]+==+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    chunks = re.split(r"(?<=[.!?])\s+", text)
    out = []
    seen = set()
    for chunk in chunks:
        line = re.sub(r"\[(?:\d+|zdroj\??|citation needed)\]", "", chunk).strip(" -\n\t")
        if len(line) < 70 or len(line) > 480:
            continue
        if "{{" in line or "}}" in line or "|" in line:
            continue
        if SKIP.search(line):
            continue
        if line.count("(") != line.count(")"):
            line = re.sub(r"\([^)]*$", "", line).strip()
        key = re.sub(r"[^a-z0-9áčďéěíňóřšťúůýž]", "", line.lower())[:90]
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(line)
    return out


def load_lecture() -> dict:
    merged = {}
    if not NOTES_DIR.exists():
        return merged
    for path in sorted(NOTES_DIR.glob("*.json")):
        if path.name.startswith("wiki"):
            continue
        try:
            merged.update(json.loads(path.read_text(encoding="utf-8")))
        except json.JSONDecodeError:
            print("skip broken", path.name)
    return merged


def merge_lists(base: list[str], extra: list[str], limit: int = 32) -> list[str]:
    out = []
    seen = set()
    for line in list(base) + list(extra):
        if not line or line[:1].islower():
            continue
        key = re.sub(r"[^a-z0-9áčďéěíňóřšťúůýž]", "", line.lower())[:80]
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(line)
        if len(out) >= limit:
            break
    return out


def write_json(path: Path, payload) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def main() -> None:
    import sys
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    only = None
    if len(sys.argv) > 1:
        only = {int(part) for part in sys.argv[1].split(",")}
    games = json.loads(GAMES.read_text(encoding="utf-8"))
    lecture = load_lecture()
    cache = {}
    if CACHE.exists():
        cache = json.loads(CACHE.read_text(encoding="utf-8"))
    done = 0
    for game in games:
        gid = game["id"]
        if only and gid not in only:
            continue
        key = str(gid)
        block = lecture.get(key) or {}
        cached = cache.get(key)
        if cached and not accept_article(
            " ".join(cached.get("en") or []),
            cached.get("enTitle") or "",
            game["name"],
            game["year"],
            gid in WIKI_OVERRIDES,
        ):
            cached = None
        if not cached:
            bare = re.sub(r"\s*\([^)]*\)\s*$", "", game["name"]).strip()
            override = WIKI_OVERRIDES.get(gid)
            title = override or bare
            en_text, en_title = page_extract("en", title)
            if not accept_article(en_text, en_title, bare, game["year"], bool(override), title):
                for candidate in (
                    f"{bare} ({game['year']} video game)",
                    f"{bare} (video game)",
                    search_title("en", bare, game["year"]),
                ):
                    if not candidate or candidate == en_title:
                        continue
                    en_text, en_title = page_extract("en", candidate)
                    if accept_article(en_text, en_title, bare, game["year"], False, candidate):
                        break
                else:
                    en_text = ""
            cs_text, cs_title = "", ""
            if accept_article(en_text, en_title, bare, game["year"], bool(override), title):
                cs_text, cs_title = page_extract("cs", en_title)
                if not accept_cs(cs_text, cs_title, game["year"]):
                    found = search_title("cs", bare, game["year"])
                    if found and found != cs_title:
                        alt, alt_title = page_extract("cs", found)
                        if accept_cs(alt, alt_title, game["year"]):
                            cs_text, cs_title = alt, alt_title
                        else:
                            cs_text = ""
                    else:
                        cs_text = ""
            cached = {
                "enTitle": en_title,
                "csTitle": cs_title,
                "en": sentences(en_text) if accept_article(en_text, en_title, bare, game["year"], bool(override), title) else [],
                "cs": sentences(cs_text) if accept_cs(cs_text, cs_title, game["year"]) else [],
            }
            cache[key] = cached
            if done % 15 == 0:
                write_json(CACHE, cache)
        game["notesEn"] = merge_lists(block.get("en") or [], cached.get("en") or [])
        game["notesCs"] = merge_lists(block.get("cs") or [], cached.get("cs") or [])
        if not game["notesCs"]:
            game["notesCs"] = [game["whyCs"]] if game.get("whyCs") else []
        done += 1
        print(
            f"[{done}] {gid} {game['name']} cs={len(game['notesCs'])} en={len(game['notesEn'])} ({cached.get('enTitle')})",
            flush=True,
        )
        if not only and done % 20 == 0:
            write_json(GAMES, games)
    write_json(CACHE, cache)
    write_json(GAMES, games)
    print("saved", GAMES)


if __name__ == "__main__":
    main()
