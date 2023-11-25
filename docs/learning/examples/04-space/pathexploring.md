---
title: Path Explorer
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- source: [examples/src/04-space/pathexploring/path-explorer.ts](https://github.com/APHGames/examples/blob/main/src/04-space/pathexploring/path-explorer.ts)

### Path Explorer
- uses TypeScript generators as state machines
- first it generates a random map with walls and cities
- then it explores the map, using a depth-first search algorithm
- every time the "agent" encounters a crossroad, it leaves a breadcrumb behind (white square)

<APHCanvas name={'PathExplorer'} />
