---
title: Animation
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

This example demonstrates synchronization of an simple animation between the client and the server

### Source 
- source: [examples/src/09-network/network-basic.ts](https://github.com/APHGames/examples/blob/main/src/09-network/network-anim.ts)

### Architecture
<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/network/architecture.svg')} />
</div>

- this example is just a simulation - the source code contains a module called `UDP Mock` that simulates unreliable connection
- the module can be configured to imitate packet loss, delay, and reoreding

### Controls
- click on the second screen to attach the keyboard to the server canvas
- `Q` and `W` keys modify the frequency at which the serves sends updates
- hold `S` to stop sending messages completely

<APHCanvas name={'NetworkAnim'} canvasId='myCanvas2' />
