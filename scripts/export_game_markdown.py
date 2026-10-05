# -*- coding: utf-8 -*-
"""Turn game essays out of the catalog JSON and into markdown files.

JSON keeps the index fields (name, year, platform, categories, pictures).
The article body is written to content/worthwhile/{cs,en}/{slug}-{id}.md.
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAMES_JSON = ROOT / "src" / "internals" / "worthwhile-games.json"
MEDIA_JSON = ROOT / "src" / "internals" / "worthwhile-media.json"
OUT = ROOT / "content" / "worthwhile"

KEEP = (
    "id", "name", "year", "platformCs", "platformEn", "developerCs", "developerEn",
    "genreCs", "genreEn", "categories", "image", "pixelated", "imageWidth",
    "imageHeight", "imageSource", "imageLicense",
)
STOP = {
    "the", "and", "for", "with", "from", "game", "games", "that", "this",
    "into", "over", "under", "your", "their",
}
CAPTION = {
    "cs": {"cover": "Obal", "poster": "Plakát", "artwork": "Výtvarný návrh", "screenshot": "Snímek ze hry"},
    "en": {"cover": "Cover", "poster": "Poster", "artwork": "Artwork", "screenshot": "In the game"},
}


def slug_for(game: dict) -> str:
    name = str(game.get("name") or "")
    decomposed = unicodedata.normalize("NFKD", name)
    stripped = "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")
    base = re.sub(r"[^a-z0-9]+", "-", stripped.lower().replace("&", " and ")).strip("-")
    return f"{base or 'game'}-{int(game['id'])}"


def tokens(name: str) -> list[str]:
    plain = re.sub(r"[^a-z0-9 ]+", " ", name.lower())
    return [word for word in plain.split() if len(word) >= 4 and word not in STOP]


def about_game(sentence: str, name_tokens: list[str]) -> bool:
    if not name_tokens:
        return True
    low = sentence.lower()
    return any(re.search(rf"(?<![a-z0-9]){re.escape(token)}(?![a-z0-9])", low) for token in name_tokens)


def paragraphs(summary: str, why: str, notes: list[str], name_tokens: list[str]) -> list[str]:
    opening = " ".join(part.strip() for part in (summary, why) if part and part.strip())
    lecture = [note.strip() for note in notes[:12] if note and note.strip()]
    extra = [
        note.strip() for note in notes[12:]
        if note and note.strip() and about_game(note, name_tokens)
    ]
    sentences = lecture + extra
    grouped: list[str] = []
    if opening:
        grouped.append(opening)
    bucket: list[str] = []
    for sentence in sentences:
        if sentence == summary or sentence == why:
            continue
        bucket.append(sentence)
        if len(bucket) == 2:
            grouped.append(" ".join(bucket))
            bucket = []
    if bucket:
        grouped.append(" ".join(bucket))
    return grouped


def figure_line(item: dict, locale: str) -> str:
    kind = item.get("kind") or "screenshot"
    caption = CAPTION[locale].get(kind, CAPTION[locale]["screenshot"])
    src = item.get("src") or ""
    return f"![{caption}]({src})"


def article(game: dict, media: list[dict], locale: str) -> str:
    summary = game.get(f"summary{locale.title()}") or game.get("summaryEn") or ""
    why = game.get(f"why{locale.title()}") or game.get("whyEn") or ""
    notes = game.get(f"notes{locale.title()}") or game.get("notesEn") or []
    blocks = paragraphs(summary, why, notes, tokens(game.get("name") or ""))
    images = [figure_line(item, locale) for item in media if item.get("src")]
    parts: list[str] = []
    image_at = 0
    for index, block in enumerate(blocks):
        if image_at < len(images) and index % 2 == 0:
            parts.append(images[image_at])
            image_at += 1
        parts.append(block)
    parts.extend(images[image_at:])
    return "\n\n".join(parts) + "\n"


def load_notes() -> dict:
    merged = {}
    folder = ROOT / "scripts" / "game-notes"
    for path in sorted(folder.glob("[0-9]*.json")):
        merged.update(json.loads(path.read_text(encoding="utf-8")))
    return merged


def load_wiki() -> dict:
    path = ROOT / "scripts" / "game-notes" / "wiki-cache.json"
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def clean_lines(lines: list[str]) -> list[str]:
    out = []
    for line in lines:
        text = (line or "").strip()
        if len(text) < 40 or text[:1].islower():
            continue
        out.append(text)
    return out


def main() -> None:
    sys_path = str(ROOT / "scripts")
    if sys_path not in sys.path:
        sys.path.insert(0, sys_path)
    import build_worthwhile_catalog as catalog

    games = json.loads(GAMES_JSON.read_text(encoding="utf-8"))
    media = json.loads(MEDIA_JSON.read_text(encoding="utf-8")) if MEDIA_JSON.exists() else {}
    parsed = {game["id"]: game for game in catalog.parse_games()}
    english = catalog.load_en()
    lecture = load_notes()
    wiki = load_wiki()
    for locale in ("cs", "en"):
        (OUT / locale).mkdir(parents=True, exist_ok=True)
    for game in games:
        gid = int(game["id"])
        source = parsed.get(gid) or {}
        blurbs = english.get(str(gid)) or {}
        notes = lecture.get(str(gid)) or {}
        article_notes = {
            "cs": clean_lines((notes.get("cs") or []) + ((wiki.get(str(gid)) or {}).get("cs") or [])),
            "en": clean_lines((notes.get("en") or []) + ((wiki.get(str(gid)) or {}).get("en") or [])),
        }
        record = {
            **game,
            "summaryCs": source.get("summaryCs") or "",
            "whyCs": source.get("whyCs") or "",
            "summaryEn": blurbs.get("summary") or "",
            "whyEn": blurbs.get("why") or "",
            "notesCs": article_notes["cs"],
            "notesEn": article_notes["en"],
        }
        pictures = media.get(str(gid)) or []
        if not pictures and game.get("image"):
            pictures = [{"src": game["image"], "kind": "screenshot"}]
        for locale in ("cs", "en"):
            path = OUT / locale / f"{slug_for(record)}.md"
            path.write_text(article(record, pictures, locale), encoding="utf-8")
    print(f"wrote {len(games)} markdown essays in {OUT}")


if __name__ == "__main__":
    main()
