import json
from pathlib import Path

root = Path("src/internals/worthwhile-games.json")
games = json.loads(root.read_text(encoding="utf-8"))
notes = {}
folder = Path("scripts/game-notes")
for path in sorted(folder.glob("*.json")):
    notes.update(json.loads(path.read_text(encoding="utf-8")))

missing = []
short = []
for game in games:
    block = notes.get(str(game["id"]))
    if not block:
        missing.append(game["id"])
        continue
    cs = block.get("cs") or []
    en = block.get("en") or []
    if len(cs) < 8 or len(cs) != len(en):
        short.append(game["id"])
    game["notesCs"] = cs
    game["notesEn"] = en

root.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")
print("merged", len(games) - len(missing), "missing", missing, "short", short)
