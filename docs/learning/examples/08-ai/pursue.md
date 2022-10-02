---
title: Pursuing Bots
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

### Source 
- source: `examples/src/08-ai/pursue`

### Description
- use arrows to move the other bot
- the AI bot starts pursuing the other bot, once it walks into its visibility cone
- once the AI bot loses its sight, it tries to search the nearest tiles
- after a certain number of iterations, the AI bot switches back to a random walk mode

<APHCanvas name={'Pursue'} />

