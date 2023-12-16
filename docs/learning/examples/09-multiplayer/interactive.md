---
title: Interactive
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'


This example demonstrates synchronization between the client and the server


### Source 
- source: [examples/src/09-network/network-interactive.ts](https://github.com/APHGames/examples/blob/main/src/09-network/network-interactive.ts)

### Architecture
<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/network/architecture.svg')} />
</div>

- this example is just a simulation - the source code contains a module called `UDP Mock` that simulates unreliable connection
- the module can be configured to imitate packet loss, delay, and reoreding

### Controls
- click on either canvas to create a new element. It will synchronize itself with the second client

<APHCanvas name={'NetworkInteractive'} canvasId='myCanvas2' />
