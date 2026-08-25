---
title: Průzkumník cest
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- zdroj: [examples/src/04-space/pathexploring/path-explorer.ts](https://github.com/APHGames/examples/blob/main/src/04-space/pathexploring/path-explorer.ts)

### Průzkumník cest
- využívá TypeScript generátory jako stavové automaty
- nejprve vygeneruje náhodnou mapu se zdmi a městy
- poté prozkoumá mapu algoritmem prohledávání do hloubky
- pokaždé, když "agent" narazí na křižovatku, zanechá za sebou stopu (bílý čtverec)

<APHCanvas name={'PathExplorer'} />
