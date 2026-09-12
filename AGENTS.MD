# Agent notes — APHGames Web

This repository is the **APHGames** static site (Docusaurus): documentation, embedded **examples** bundle, **Reveal.js** slides, gallery links, and locale-specific pages.

## Canonical architecture document

Before making non-trivial changes, read:

**[aidocs/prd.md](aidocs/prd.md)**

That file describes stack versions, folder layout, how `web.config.js` and `scripts/download_data.js` connect to **APHGames/examples** and **APHGames/slides**, i18n (split builds per `--locale`), MDX embedding (`APHCanvas`, lecture slide lists), and theme/plugin overrides.

## Quick facts for agents

- **No backend** in this repo; production is static output from `docusaurus build`.
- **Examples and slides** are not committed: run `npm run download_data` after clone.
- **Locale:** use `npm run start_en` / `start_cs` (and matching `build_*`). Each build targets one language; Czech-only docs use front matter `exclude_en` / `exclude_cs` and sidebar filtering in `docusaurus.config.js`. Czech-only pages: `/videos`, `/artifacts`.
- **Embedding demos:** docs import `APHCanvas` with a `name` matching `window.APH` from the downloaded examples bundle.
- **Slide listings:** driven by `static/slides/slides-info.json` from the slides release; see `docs/learning/lectures.tsx` vs `docs/courses/aph_lectures.tsx`.

When you change behavior that spans content + assets + config, update **aidocs/prd.md** so it stays accurate.

## Cursor rules

Persistent agent instructions live in **`.cursor/rules/`** (split by concern: project core, i18n, docs/MDX, external assets, React src). Those rules mirror this file and `aidocs/prd.md` for in-IDE context.
