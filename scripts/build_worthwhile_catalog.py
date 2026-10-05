# -*- coding: utf-8 -*-
"""Build the 500 Worthwhile Games catalog and fetch screenshots.

    python scripts/build_worthwhile_catalog.py --write-games
    python scripts/build_worthwhile_catalog.py --fetch-images
    python scripts/build_worthwhile_catalog.py --fetch-images --limit 20

Screenshots come from Wikimedia (preferred) and, if a page has no usable
gameplay image, from the public Steam store API. Pixel-art captures whose
source is at most 640x480 are enlarged with nearest-neighbor scaling.
"""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "deep-research-report.md"
EN_BLURBS = ROOT / "scripts" / "worthwhile-en.json"
GAMES_JSON = ROOT / "src" / "internals" / "worthwhile-games.json"
IMG_DIR = ROOT / "static" / "img" / "worthwhile-games"
MANIFEST = IMG_DIR / "manifest.json"

UA = "APHGamesWorthwhileCatalog/1.0 (https://aphgames.io; educational catalog; local screenshot mirror)"
CITE_RE = re.compile("\uE200.*?\uE201|[\uE000-\uF8FF]")

GENRE_PHRASES = [
    ("Tahová dělostřelecká hra", "Turn-based artillery"),
    ("Online textové RPG", "Online text RPG"),
    ("Visual novel/adventura", "Visual novel/adventure"),
    ("Závody/vehikulární boj", "Racing/vehicular combat"),
    ("3D tanková akce", "3D tank action"),
    ("Ekonomická strategie", "Economic strategy"),
    ("Politická strategie", "Political strategy"),
    ("Grafická adventura", "Graphic adventure"),
    ("Textová adventura", "Text adventure"),
    ("Interaktivní film", "Interactive movie"),
    ("Dedukční adventura", "Deduction adventure"),
    ("Narativní adventura", "Narrative adventure"),
    ("Narativní RPG", "Narrative RPG"),
    ("FMV/detektivka", "FMV/detective"),
    ("Fyzikální puzzle", "Physics puzzle"),
    ("Meta-adventura", "Meta-adventure"),
    ("Mech simulátor", "Mech simulator"),
    ("Závodní simulátor", "Racing simulator"),
    ("Závodní simulace", "Racing simulation"),
    ("Závodní akce", "Racing action"),
    ("Vehikulární boj", "Vehicular combat"),
    ("Vehikulární akce", "Vehicular action"),
    ("Vertikální shooter", "Vertical shooter"),
    ("Survival horor", "Survival horror"),
    ("Survival akce", "Survival action"),
    ("Top-down akce", "Top-down action"),
    ("Taktická strategie", "Tactical strategy"),
    ("Taktická akce", "Tactical action"),
    ("Taktické FPS", "Tactical FPS"),
    ("Taktické RPG", "Tactical RPG"),
    ("Tahová strategie", "Turn-based strategy"),
    ("Open-world akce", "Open-world action"),
    ("Bojová akce", "Combat action"),
    ("Akce/adventura", "Action/adventure"),
    ("Akce/management", "Action/management"),
    ("Akce/simulace", "Action/simulation"),
    ("Strategie/adventura", "Strategy/adventure"),
    ("Strategie/akce", "Strategy/action"),
    ("Strategie/puzzle", "Strategy/puzzle"),
    ("Stealth/akce", "Stealth/action"),
    ("FPS/strategie", "FPS/strategy"),
    ("Puzzle/strategie", "Puzzle/strategy"),
    ("Puzzle/simulace", "Puzzle/simulation"),
    ("Puzzle/arkáda", "Puzzle/arcade"),
    ("Puzzle/akce", "Puzzle/action"),
    ("Platform/akce", "Platform/action"),
    ("RTS/akce", "RTS/action"),
    ("CRPG/taktika", "CRPG/tactics"),
    ("Simulace/roguelike", "Simulation/roguelike"),
    ("Roguelite/strategie", "Roguelite/strategy"),
    ("4X strategie", "4X strategy"),
    ("Taktika/strategie", "Tactics/strategy"),
    ("Karetní", "Card game"),
    ("Arkáda", "Arcade"),
    ("Adventura", "Adventure"),
    ("Strategie", "Strategy"),
    ("Simulace", "Simulation"),
    ("Simulátor", "Simulator"),
    ("Závody", "Racing"),
    ("Akce", "Action"),
    ("Taktika", "Tactics"),
    ("Sport", "Sports"),
]

# Thematic sets. A game may also land in generation/platform categories by heuristic.
GRAPHICS = {
    19, 28, 36, 40, 45, 46, 55, 75, 80, 95, 118, 121, 140, 144, 148, 155, 156, 163, 164,
    183, 184, 197, 199, 200, 209, 217, 240, 247, 262, 290, 292, 298, 318, 333, 347, 358,
    360, 361, 372, 376, 378, 385, 400, 409, 427, 433, 455, 467, 477, 484, 493, 497,
}
MECHANICS = {
    1, 3, 6, 10, 16, 17, 32, 42, 50, 53, 60, 69, 71, 72, 84, 85, 88, 104, 105, 106, 122, 123,
    126, 127, 131, 143, 199, 201, 215, 241, 246, 255, 270, 271, 274, 275, 281, 289, 294, 295, 316, 319, 321,
    328, 333, 338, 346, 349, 359, 367, 373, 376, 387, 392, 398, 418, 421, 426, 434, 437,
    438, 442, 449, 450, 460, 464, 469, 470, 475, 476, 478, 479, 480, 481, 485, 486, 489,
    439, 492, 494, 495, 498, 499,
}
NARRATIVE = {
    8, 20, 51, 61, 86, 102, 103, 113, 126, 142, 150, 162, 173, 176, 188, 192, 217, 219,
    228, 241, 242, 245, 247, 248, 252, 257, 262, 263, 288, 296, 297, 298, 304, 320, 347,
    350, 372, 377, 380, 396, 400, 411, 412, 416, 423, 430, 433, 435, 437, 446, 450, 451,
    455, 461, 466, 467, 468, 474, 481, 490, 491, 493, 498,
}
SYSTEMIC = {
    17, 42, 50, 61, 66, 91, 92, 98, 105, 106, 127, 132, 139, 145, 154, 158, 159, 167, 211,
    220, 225, 234, 236, 246, 256, 267, 268, 269, 279, 281, 282, 308, 312, 326, 331, 333,
    341, 342, 367, 371, 379, 386, 391, 397, 415, 416, 419, 421, 422, 424, 425, 426, 429,
    431, 444, 448, 452, 457, 460, 465, 471, 472, 475, 479, 488, 491, 492, 495,
}
MULTIPLAYER = {
    1, 3, 4, 9, 11, 31, 41, 62, 76, 89, 123, 129, 136, 137, 143, 149, 152, 165, 177, 178,
    197, 203, 205, 206, 218, 220, 235, 243, 249, 255, 258, 259, 260, 261, 265, 266, 271,
    276, 283, 294, 299, 309, 326, 330, 334, 336, 349, 354, 356, 374, 375, 381, 382, 387,
    398, 403, 405, 414, 427, 436, 443, 449, 454, 462, 478, 485,
}
OPEN_WORLD = {
    50, 56, 68, 72, 91, 211, 234, 262, 295, 308, 310, 317, 318, 335, 362, 365, 368, 385,
    386, 394, 397, 401, 410, 412, 416, 419, 421, 432, 446, 448, 460, 467, 472, 483, 488, 492,
}
PUZZLE = {
    35, 52, 53, 77, 79, 122, 144, 215, 229, 255, 275, 305, 338, 349, 369, 373, 381, 384,
    392, 393, 406, 409, 420, 434, 438, 441, 451, 455, 459, 470, 471, 473, 479, 480, 486,
    494, 495, 499,
}
INDIE = {
    345, 371, 384, 392, 393, 406, 409, 417, 423, 424, 427, 428, 429, 434, 435, 437, 445,
    450, 451, 452, 455, 458, 459, 462, 463, 466, 469, 470, 471, 474, 475, 479, 480, 481,
    486, 489, 494, 495, 496, 498, 499,
}
GEN1 = {1, 2, 3, 4, 5, 6, 7}

FILE_OVERRIDES = {
    204: "File:CivII 01.png",
    255: "File:DDR 1stMIX flyer.jpg",
    264: "File:Soul Calibur DC.jpg",
    276: "File:Street Fighter III 3rd Strike (flyer).png",
}

WIKI_OVERRIDES = {
    9: "Combat (video game)",
    51: "King's Quest I",
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


def clean(text: str) -> str:
    text = CITE_RE.sub("", text)
    text = text.replace("\u200b", "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def translate_genre(genre: str) -> str:
    if genre in dict(GENRE_PHRASES):
        return dict(GENRE_PHRASES)[genre]
    out = genre
    for src, dst in GENRE_PHRASES:
        out = out.replace(src, dst)
    return out


def localize_phrase(text: str) -> str:
    reps = [
        ("síťové počítače", "networked computers"),
        ("domácí počítače", "home computers"),
        ("PS5 následně", "PS5 later"),
        ("nekomerční", "non-commercial"),
        ("pův. self-published", "originally self-published"),
        (" a MIT tým", " and the MIT team"),
        ("později", "later"),
        ("následně", "later"),
        (" aj.", " et al."),
        ("síť", "network"),
        ("Alexej Pažitnov", "Alexey Pajitnov"),
    ]
    out = text
    for src, dst in reps:
        out = out.replace(src, dst)
    return out


def parse_games() -> list[dict]:
    rows = []
    for line in REPORT.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\| \d+ \|", line):
            continue
        parts = [p.strip() for p in line.strip().strip("|").split("|")]
        if len(parts) != 8:
            raise SystemExit(f"Bad row: {line[:80]}")
        rows.append({
            "id": int(parts[0]),
            "name": clean(parts[1]),
            "year": int(parts[2]),
            "platformCs": clean(parts[3]),
            "platformEn": localize_phrase(clean(parts[3])),
            "developerCs": clean(parts[4]),
            "developerEn": localize_phrase(clean(parts[4])),
            "genreCs": clean(parts[5]),
            "genreEn": translate_genre(clean(parts[5])),
            "summaryCs": clean(parts[6]),
            "whyCs": clean(parts[7]),
        })
    if len(rows) != 500:
        raise SystemExit(f"Expected 500 games, got {len(rows)}")
    return rows


def _consume(platform: str, patterns: list[str]) -> tuple[str, bool]:
    hit = False
    for pattern in patterns:
        if re.search(pattern, platform, flags=re.I):
            hit = True
            platform = re.sub(pattern, " ", platform, flags=re.I)
    return platform, hit


def platform_categories(game: dict) -> list[str]:
    platform = game["platformCs"]
    year = game["year"]
    cats: list[str] = []

    platform, split_gen = _consume(platform, [r"PS4\s*/\s*5"])
    platform, gen9 = _consume(platform, [
        r"PlayStation\s*5",
        r"\bPS5\b",
        r"Xbox Series",
        r"Switch\s*2",
    ])
    if split_gen:
        gen9 = True
    platform, gen8 = _consume(platform, [
        r"PlayStation\s*4",
        r"\bPS4\b",
        r"Xbox One",
        r"Wii\s*U",
        r"Nintendo Switch",
        r"\bSwitch\b",
    ])
    if split_gen:
        gen8 = True
    platform, gen7 = _consume(platform, [
        r"PlayStation\s*3",
        r"\bPS3\b",
        r"Xbox\s*360",
        r"\bX360\b",
        r"\bWii\b",
    ])
    platform, gen6 = _consume(platform, [
        r"PlayStation\s*2",
        r"\bPS2\b",
        r"\bGameCube\b",
        r"\bDreamcast\b",
        r"Game Boy Advance",
        r"\bGBA\b",
        r"\bXbox\b",
        r"\bGC\b",
        r"\bDC\b",
    ])
    platform, gen5 = _consume(platform, [
        r"PlayStation",
        r"\bPS1\b",
        r"Nintendo 64",
        r"\bN64\b",
        r"\bSaturn\b",
        r"\bJaguar\b",
        r"\b32X\b",
    ])
    platform, gen4 = _consume(platform, [
        r"\bSNES\b",
        r"Super Famicom",
        r"Super NES",
        r"Mega Drive",
        r"\bGenesis\b",
        r"PC Engine",
        r"TurboGrafx",
        r"Neo Geo",
    ])
    platform, gen3 = _consume(platform, [
        r"Famicom Disk System",
        r"\bFamicom\b",
        r"\bNES\b",
        r"Master System",
        r"Game Boy Color",
        r"Game Boy",
    ])
    platform, gen2 = _consume(platform, [
        r"2600",
        r"\bVCS\b",
        r"Intellivision",
        r"ColecoVision",
    ])
    _, arcade = _consume(platform, [r"\bArcade\b"])
    _, handheld = _consume(game["platformCs"], [
        r"Game Boy Advance",
        r"\bGBA\b",
        r"Game Boy Color",
        r"Game Boy",
        r"Nintendo DS",
        r"\bDS\b",
    ])
    _, pc = _consume(game["platformCs"], [
        r"\bDOS\b",
        r"\bWindows\b",
        r"\bWin\b",
        r"Apple II",
        r"\bC64\b",
        r"ZX Spectrum",
        r"\bSpectrum\b",
        r"\bAmiga\b",
        r"Atari 8-bit",
        r"Atari ST",
        r"BBC Micro",
        r"\bBBC\b",
        r"Macintosh",
        r"macOS",
        r"\bMac\b",
        r"\bUnix\b",
        r"\bPDP\b",
        r"\bIBM\b",
        r"\bLinux\b",
        r"TRS-80",
        r"\bMSX",
        r"PC-8801",
        r"PC-88",
        r"Elektronika",
        r"domácí počítače",
        r"\bImlac\b",
    ])

    # Bare "PS" / "Xbox" in late multiplatform shorthand ("PC, PS, Xbox, Switch").
    bare = game["platformCs"]
    if re.search(r"\bPS\b", bare) and not re.search(r"PS[1-5]|PlayStation", bare):
        if year >= 2020:
            gen9 = True
        elif year >= 2013:
            gen8 = True
        elif year >= 2006:
            gen7 = True
        elif year >= 2000:
            gen6 = True
        else:
            gen5 = True
    if re.search(r"\bXbox\b", bare) and not re.search(r"Xbox\s*(360|One|Series)", bare) and year >= 2013:
        # Original Xbox token was already consumed into gen6. Reclassify late shorthand.
        if year >= 2020:
            gen9 = True
            gen6 = False
        elif year >= 2013:
            gen8 = True
            gen6 = False

    if gen9:
        cats.append("gen9")
    if gen8:
        cats.append("gen8")
    if gen7:
        cats.append("gen7")
    if gen6:
        cats.append("gen6")
    if gen5:
        cats.append("gen5")
    if gen4:
        cats.append("gen4")
    if gen3:
        cats.append("gen3")
    if gen2:
        cats.append("gen2")
    return cats


def categories_for(game: dict) -> list[str]:
    gid = game["id"]
    cats = []
    if gid in GEN1:
        cats.append("gen1")
    cats.extend(platform_categories(game))
    thematic = [
        ("graphics", GRAPHICS),
        ("mechanics", MECHANICS),
        ("narrative", NARRATIVE),
        ("systemic", SYSTEMIC),
        ("multiplayer", MULTIPLAYER),
        ("open-world", OPEN_WORLD),
    ]
    for key, bucket in thematic:
        if gid in bucket:
            cats.append(key)
    # Stable, unique order
    seen = []
    for cat in cats:
        if cat not in seen:
            seen.append(cat)
    return seen


def load_en() -> dict:
    merged = {}
    folder = ROOT / "scripts" / "en-blurbs"
    if folder.exists():
        for path in sorted(folder.glob("*.json")):
            merged.update(json.loads(path.read_text(encoding="utf-8")))
    if EN_BLURBS.exists():
        merged.update(json.loads(EN_BLURBS.read_text(encoding="utf-8")))
    return merged


def build_records() -> list[dict]:
    en = load_en()
    manifest = {}
    if MANIFEST.exists():
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    games = []
    missing_en = []
    for game in parse_games():
        gid = str(game["id"])
        blurbs = en.get(gid) or {}
        if not blurbs.get("summary") or not blurbs.get("why"):
            missing_en.append(game["id"])
        shot = manifest.get(gid) or {}
        image = None
        if shot.get("file"):
            image = f"/img/worthwhile-games/{shot['file']}"
        games.append({
            **game,
            "summaryEn": blurbs.get("summary", ""),
            "whyEn": blurbs.get("why", ""),
            "categories": categories_for(game),
            "image": image,
            "pixelated": bool(shot.get("pixelated")),
            "imageWidth": shot.get("width"),
            "imageHeight": shot.get("height"),
            "imageSource": shot.get("source"),
            "imageLicense": shot.get("license"),
        })
    if missing_en:
        print(f"Missing English blurbs: {len(missing_en)} (first {missing_en[:12]})")
    return games


def write_games() -> None:
    games = build_records()
    GAMES_JSON.parent.mkdir(parents=True, exist_ok=True)
    GAMES_JSON.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")
    from collections import Counter
    counts = Counter(cat for game in games for cat in game["categories"])
    print(f"Wrote {len(games)} games to {GAMES_JSON}")
    for key, count in sorted(counts.items(), key=lambda kv: -kv[1]):
        print(f"  {key:12} {count}")


# --- screenshots -----------------------------------------------------------

def http_json(url: str, retries: int = 6) -> dict:
    delay = 2.0
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=45) as res:
                return json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            if err.code in (429, 503) and attempt + 1 < retries:
                time.sleep(max(delay, 12))
                delay = min(delay * 2, 30)
                continue
            raise
        except (urllib.error.URLError, TimeoutError):
            if attempt + 1 < retries:
                time.sleep(max(delay, 12))
                delay = min(delay * 2, 30)
                continue
            raise
    raise RuntimeError(f"Failed to fetch {url}")


def http_bytes(url: str, retries: int = 4) -> bytes:
    delay = 1.5
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as res:
                return res.read()
        except urllib.error.HTTPError as err:
            if err.code in (429, 503) and attempt + 1 < retries:
                time.sleep(max(delay, 12))
                delay *= 2
                continue
            raise
        except (urllib.error.URLError, TimeoutError):
            if attempt + 1 < retries:
                time.sleep(max(delay, 12))
                delay *= 2
                continue
            raise
    raise RuntimeError(f"Failed to download {url}")


def wiki_api(params: dict) -> dict:
    params = {"format": "json", **params}
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params, safe="|")
    data = http_json(url)
    time.sleep(0.6)
    return data


def batched(items: list, size: int):
    for i in range(0, len(items), size):
        yield items[i:i + size]


def existing_titles(titles: list[str]) -> dict[str, str]:
    """Map requested title -> canonical title for pages that exist."""
    found: dict[str, str] = {}
    for chunk in batched(titles, 40):
        data = wiki_api({
            "action": "query",
            "titles": "|".join(chunk),
            "redirects": 1,
            "prop": "pageprops",
            "ppprop": "disambiguation",
        })
        redirect_to = {}
        for redir in data.get("query", {}).get("redirects", []):
            redirect_to[redir["from"]] = redir["to"]
        pages = data.get("query", {}).get("pages", {})
        canonical_ok = set()
        for page in pages.values():
            if "missing" in page:
                continue
            if "disambiguation" in page.get("pageprops", {}):
                continue
            canonical_ok.add(page["title"])
        for title in chunk:
            dest = redirect_to.get(title, title)
            if dest in canonical_ok:
                found[title] = dest
    return found


def resolve_titles(games: list[dict]) -> dict[int, str]:
    candidates: dict[int, list[str]] = {}
    all_titles = []
    for game in games:
        gid = game["id"]
        name = game["name"]
        year = game["year"]
        if gid in WIKI_OVERRIDES:
            opts = [WIKI_OVERRIDES[gid]]
        else:
            opts = [
                f"{name} ({year} video game)",
                f"{name} (video game)",
                name,
            ]
        # unique, keep order
        seen = []
        for opt in opts:
            if opt not in seen:
                seen.append(opt)
        candidates[gid] = seen
        all_titles.extend(seen)
    found = existing_titles(list(dict.fromkeys(all_titles)))
    resolved = {}
    pending = []
    for game in games:
        gid = game["id"]
        for opt in candidates[gid]:
            if opt in found:
                resolved[gid] = found[opt]
                break
        else:
            pending.append(game)
    print(f"Resolved {len(resolved)} Wikipedia titles directly, searching {len(pending)}")
    for game in pending:
        query = f"\"{game['name']}\" {game['year']} video game"
        data = wiki_api({
            "action": "query",
            "list": "search",
            "srsearch": query,
            "srlimit": 4,
        })
        hits = data.get("query", {}).get("search", [])
        if hits:
            resolved[game["id"]] = hits[0]["title"]
            print(f"  search {game['id']} {game['name']} -> {hits[0]['title']}")
        else:
            print(f"  NO PAGE {game['id']} {game['name']}")
    return resolved


def page_images_one(title: str) -> list[str]:
    data = wiki_api({
        "action": "query",
        "titles": title,
        "redirects": 1,
        "prop": "images",
        "imlimit": "50",
    })
    files: list[str] = []
    for page in data.get("query", {}).get("pages", {}).values():
        files.extend(img["title"] for img in page.get("images", []))
    return files


NAME_STOP = {"the", "and", "for", "with", "from", "game", "video", "inc", "vol", "part"}
HARD_NEG = re.compile(
    r"logo|icon|wordmark|flag of|commons-logo|\bsymbol\b|edit-clear|protection|shackle|"
    r"userbox|smiley|fairuse|disambig|\.svg|\.ogg|\.pdf|portrait|headshot|"
    r"\(cropped| at gdc|creator of|\bcoin\b|\bjpy\b|\byen\b|currency|"
    r"flyer|cabinet|cartridge|controller|joystick|advert|prototype|"
    r"console-set|memory board|circuit|el camino|convention|cropped|"
    r"museum|festival|\bcafe\b|station|crowd|bruce daniels|boingball|"
    r"conference|cosplay|comic con|gamepad|\bconsole\b|\bissue\b",
    re.I,
)
BOX_FILE = re.compile(
    r"box ?art|boxart|boxshot|box-shot|boxnew|boxcover|boxscan|box\.|"
    r"coverart|cover art|\bcover\b|concept art|wallpaper|\bpromo\b|"
    r"\bposter\b|artwork|world map",
    re.I,
)
HIGH_FILE = re.compile(
    r"gameplay|game-play|in-?game|screenshot|screen_shot|pixel-perfect|"
    r"game test|title ?screen|titlescreen|vt100|powered on|monitor close-up",
    re.I,
)


def name_tokens(name: str) -> list[str]:
    tokens = []
    for part in re.findall(r"[A-Za-z0-9']{3,}", name):
        low = part.lower().replace("'", "")
        if low not in NAME_STOP:
            tokens.append(low)
    collapsed = re.sub(r"[^a-z0-9]", "", name.lower())
    if len(collapsed) >= 3 and collapsed not in tokens:
        tokens.append(collapsed)
    return tokens


def rank_filename(filename: str, tokens: list[str]) -> int | None:
    low = filename.lower()
    if not re.search(r"\.(png|jpe?g|gif|webp)$", low):
        return None
    mentions = any(token in low for token in tokens)
    if BOX_FILE.search(filename):
        return 8 if mentions else None
    if HARD_NEG.search(filename):
        return None
    if HIGH_FILE.search(filename):
        bonus = 25 if mentions else 0
        bonus += 10 if low.endswith((".png", ".gif")) else 0
        return 100 + bonus
    if mentions:
        bonus = 12 if low.endswith((".png", ".gif")) else 0
        return 45 + bonus
    # Unnamed article files are often screenshots, but bare names and dated portraits are not.
    if re.search(r"screen|shot|gameplay|(?<![a-z])play|level|\bmap\b|title|sprite", low):
        return 32
    return None


def image_infos(files: list[str]) -> dict[str, dict]:
    infos = {}
    unique = [f for f in dict.fromkeys(files) if f.startswith("File:")]
    for chunk in batched(unique, 25):
        data = wiki_api({
            "action": "query",
            "titles": "|".join(chunk),
            "prop": "imageinfo",
            "iiprop": "url|size|mime|extmetadata",
        })
        for page in data.get("query", {}).get("pages", {}).values():
            info = (page.get("imageinfo") or [None])[0]
            if not info:
                continue
            meta = info.get("extmetadata") or {}
            license_name = (meta.get("LicenseShortName") or {}).get("value") or ""
            license_name = re.sub(r"<[^>]+>", "", license_name)
            infos[page["title"]] = {
                "url": info.get("url"),
                "width": info.get("width") or 0,
                "height": info.get("height") or 0,
                "mime": info.get("mime") or "",
                "license": license_name.strip(),
                "page": info.get("descriptionurl"),
            }
    return infos


def usable_dimensions(info: dict) -> bool:
    mime = info.get("mime") or ""
    if mime not in ("image/png", "image/jpeg", "image/webp", "image/gif"):
        return False
    width, height = info.get("width") or 0, info.get("height") or 0
    if width < 80 or height < 48 or width > 5000 or height > 5000:
        return False
    return True


def choose_image(files: list[str], tokens: list[str], infos: dict[str, dict]) -> dict | None:
    ranked = []
    for title in files:
        score = rank_filename(title, tokens)
        if not score:
            continue
        info = infos.get(title)
        if not info or not info.get("url") or not usable_dimensions(info):
            continue
        if title.lower().endswith(".png"):
            score += 4
        ranked.append((score, title, info))
    if not ranked:
        return None
    strong = [item for item in ranked if item[0] >= 45]
    pool = strong or ranked
    score, title, info = max(pool, key=lambda item: item[0])
    return {"title": title, **info, "score": score}


def commons_candidates(name: str) -> list[str]:
    params = urllib.parse.urlencode({
        "action": "query",
        "list": "search",
        "srsearch": f"{name} gameplay screenshot",
        "srnamespace": "6",
        "srlimit": "8",
        "format": "json",
    })
    try:
        data = http_json("https://commons.wikimedia.org/w/api.php?" + params)
    except Exception as err:  # noqa: BLE001
        print(f"  commons search failed for {name}: {err}")
        return []
    time.sleep(0.6)
    found = []
    for hit in data.get("query", {}).get("search", []):
        title = hit.get("title") or ""
        if title and not title.startswith("File:"):
            title = "File:" + title
        found.append(title)
    return found


def collapsed_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]", "", value.lower())


def commons_name_match(filename: str, name: str) -> bool:
    base = collapsed_name(filename.split(":")[-1])
    collapsed = collapsed_name(name)
    if not collapsed or not base:
        return False
    if base.startswith(collapsed) or collapsed.startswith(base[: len(collapsed)]):
        return True
    tokens = [token for token in name_tokens(name) if len(token) >= 5]
    if not tokens:
        return False
    needed = tokens[:2]
    return all(token in base for token in needed)


def looks_like_pixel_art(im: Image.Image) -> bool:
    rgb = im.convert("RGB")
    colors = rgb.getcolors(maxcolors=160)
    if colors is None or len(colors) > 96:
        return False
    width, height = rgb.size
    px = rgb.load()
    same = 0
    total = 0
    step_x = max(1, width // 64)
    step_y = max(1, height // 64)
    for y in range(0, height - 1, step_y):
        for x in range(0, width - 1, step_x):
            total += 1
            if px[x, y] == px[x + 1, y]:
                same += 1
    if total == 0:
        return False
    return (same / total) >= 0.22


EDITION_WORDS = (
    "remaster", "hd", "classic", "definitive", "goty", "gameoftheyear", "collection",
    "gold", "complete", "enhanced", "anniversary", "trinity", "directorscut",
)
STEAM_PREFIXES = ("sidmeiers", "the", "tomclancys", "microsoft")


def steam_match_kind(got: str, wanted: str) -> str | None:
    if not got or not wanted:
        return None
    if got == wanted:
        return "exact"
    if got.endswith(wanted) and got[: -len(wanted)] in STEAM_PREFIXES:
        return "edition"
    if not got.startswith(wanted):
        return None
    extra = got[len(wanted):]
    if not extra or extra[:1].isdigit():
        return None
    if any(bad in extra for bad in ("dlc", "seasonpass", "soundtrack", "demo")):
        return None
    if re.match(r"(ii|iii|iv|vi|vii|viii|ix)([a-z]|$)", extra):
        return None
    return "edition"


def steam_shot(name: str, year: int) -> dict | None:
    query = urllib.parse.urlencode({"term": name, "l": "english", "cc": "us"})
    try:
        data = http_json(f"https://store.steampowered.com/api/storesearch/?{query}")
    except Exception as err:  # noqa: BLE001
        print(f"  steam search failed for {name}: {err}")
        return None
    wanted = collapsed_name(name)
    for item in (data.get("items") or [])[:8]:
        title = item.get("name") or ""
        got = collapsed_name(title)
        kind = steam_match_kind(got, wanted)
        if not kind:
            continue
        appid = item.get("id")
        try:
            detail = http_json(f"https://store.steampowered.com/api/appdetails?appids={appid}&l=english")
        except Exception:
            continue
        block = (detail.get(str(appid)) or {}).get("data") or {}
        release = ((block.get("release_date") or {}).get("date") or "")
        match = re.search(r"(19|20)\d{2}", release)
        limit = 30 if kind == "edition" else 10
        if not match or abs(int(match.group(0)) - year) > limit:
            continue
        shots = block.get("screenshots") or []
        if not shots:
            continue
        pick = shots[min(2, len(shots) - 1)]
        return {
            "url": pick.get("path_full"),
            "source": f"https://store.steampowered.com/app/{appid}",
            "license": "Steam store screenshot",
            "width": 0,
            "height": 0,
            "title": title,
        }
    return None


def process_image(raw: bytes) -> tuple[Image.Image, bool]:
    im = Image.open(BytesIO(raw))
    im.seek(0)
    if im.mode == "P":
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    width, height = im.size
    pixelated = width <= 640 and height <= 480 and looks_like_pixel_art(im)
    if pixelated:
        long_side = max(width, height)
        scale = max(2, math.ceil(1200 / long_side))
        scale = min(scale, 8)
        while scale > 2 and scale * long_side > 1800:
            scale -= 1
        im = im.resize((width * scale, height * scale), Image.Resampling.NEAREST)
    else:
        long_side = max(width, height)
        if long_side > 1400:
            ratio = 1400 / long_side
            im = im.resize((max(1, round(width * ratio)), max(1, round(height * ratio))), Image.Resampling.LANCZOS)
        elif long_side < 480:
            ratio = min(3.0, 960 / long_side)
            im = im.resize((max(1, round(width * ratio)), max(1, round(height * ratio))), Image.Resampling.LANCZOS)
    return im, pixelated


def ranked_files(files: list[str], tokens: list[str]) -> list[tuple[int, str]]:
    scored = []
    for item in files:
        score = rank_filename(item, tokens)
        if score:
            scored.append((score, item))
    scored.sort(key=lambda pair: -pair[0])
    return scored


def fetch_images(limit: int | None, retry_weak: bool = False) -> None:
    games = parse_games()
    if limit:
        games = games[:limit]
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {}
    if MANIFEST.exists():
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))

    def is_weak(entry: dict, game: dict) -> bool:
        if entry.get("settled"):
            return False
        if not entry.get("file"):
            return True
        original = entry.get("original") or ""
        if BOX_FILE.search(original):
            return True
        if re.search(r"concept art|wallpaper|book-of-|\bmap\.gif|\bposter\b|artwork", original, re.I):
            return True
        width = entry.get("width") or 0
        height = entry.get("height") or 0
        portrait = bool(width and height > width * 1.15 and not entry.get("pixelated"))
        gameplay = re.search(r"gameplay|screenshot|screen|in-?game|pixel|arcade|disk", original, re.I)
        named = any(token in original.lower() for token in name_tokens(game["name"]))
        if portrait and not gameplay and not named:
            return True
        return False

    def is_done(game: dict) -> bool:
        entry = manifest.get(str(game["id"])) or {}
        if retry_weak and is_weak(entry, game):
            return False
        filename = entry.get("file") or ""
        return bool(filename) and (IMG_DIR / filename).exists()

    pending = [game for game in games if not is_done(game)]
    print(f"Fetching screenshots for {len(pending)} games ({len(games) - len(pending)} already done)")
    if not pending:
        return

    titles = resolve_titles(pending)
    lock = threading.Lock()
    done = 0

    def fetch_one(game: dict) -> None:
        nonlocal done
        gid = game["id"]
        title = titles.get(gid)
        tokens = name_tokens(game["name"])
        files = page_images_one(title) if title else []
        scored = ranked_files(files, tokens)
        if not scored or scored[0][0] < 45:
            extra = [item for item in commons_candidates(game["name"]) if commons_name_match(item, game["name"])]
            scored = ranked_files([item for _, item in scored] + extra, tokens)
        top = [item for _, item in scored[:8]]
        infos = image_infos(top)
        chosen = choose_image(top, tokens, infos)
        source_kind = "wikimedia"
        if gid in FILE_OVERRIDES:
            forced = FILE_OVERRIDES[gid]
            forced_info = image_infos([forced]).get(forced)
            if forced_info and forced_info.get("url"):
                chosen = {"title": forced, **forced_info, "score": 100}
        entry: dict
        weak = not chosen or (chosen.get("score", 0) < 45 and gid not in FILE_OVERRIDES) or bool(BOX_FILE.search(chosen.get("title") or ""))
        if gid in FILE_OVERRIDES and chosen and chosen.get("title") == FILE_OVERRIDES[gid]:
            weak = False
        if weak:
            lookup = re.sub(r"\s*\([^)]*\)\s*$", "", game["name"]).strip()
            steam = steam_shot(lookup, game["year"])
            if steam and steam.get("url"):
                chosen = steam
                source_kind = "steam"
        if not chosen or not chosen.get("url"):
            entry = {"file": None, "error": "no image", "wiki": title}
            line = f"MISS {gid} {game['name']}"
        else:
            try:
                raw = http_bytes(chosen["url"])
                image, pixelated = process_image(raw)
                filename = f"{gid:03d}.png"
                image.save(IMG_DIR / filename, "PNG", optimize=True)
                entry = {
                    "file": filename,
                    "width": image.size[0],
                    "height": image.size[1],
                    "pixelated": pixelated,
                    "source": chosen.get("page") or chosen.get("source") or chosen.get("url"),
                    "license": chosen.get("license") or "",
                    "origin": source_kind,
                    "wiki": title,
                    "original": chosen.get("title") or chosen.get("url"),
                }
                flag = "pixel" if pixelated else "photo"
                label = chosen.get("title") or chosen.get("original") or ""
                line = f"{gid:03d} {game['name']} ({flag}, {image.size[0]}x{image.size[1]}) {label}"
            except Exception as err:  # noqa: BLE001
                entry = {"file": None, "error": str(err), "wiki": title, "url": chosen.get("url")}
                line = f"FAIL {gid} {game['name']}: {err}"
        original_name = entry.get("original") or ""
        if not entry.get("file") or BOX_FILE.search(original_name):
            entry["settled"] = True
        with lock:
            manifest[str(gid)] = entry
            done += 1
            print(f"[{done}/{len(pending)}] {line}", flush=True)
            if done % 10 == 0:
                MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    with ThreadPoolExecutor(max_workers=1) as pool:
        futures = [pool.submit(fetch_one, game) for game in pending]
        for future in as_completed(futures):
            future.result()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Manifest written: {MANIFEST}")


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-games", action="store_true")
    parser.add_argument("--fetch-images", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--retry-weak", action="store_true")
    args = parser.parse_args()
    if not args.write_games and not args.fetch_images:
        parser.error("Pass --write-games and/or --fetch-images")
    if args.fetch_images:
        fetch_images(args.limit, retry_weak=args.retry_weak)
    if args.write_games:
        write_games()


if __name__ == "__main__":
    main()
