---
title: Animace
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

Tento příklad demonstruje synchronizaci jednoduché animace mezi klientem a serverem

### Zdroj
- zdroj: [examples/src/09-network/network-basic.ts](https://github.com/APHGames/examples/blob/main/src/09-network/network-anim.ts)

### Architektura
<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/network/architecture.svg')} />
</div>

- tento příklad je pouze simulace - zdrojový kód obsahuje modul `UDP Mock`, který simuluje nespolehlivé připojení
- modul lze nakonfigurovat pro imitaci ztráty paketů, zpoždění a přeuspořádání

### Ovládání
- klikněte na druhou obrazovku pro připojení klávesnice k serverovému canvasu
- klávesy `Q` a `W` upravují frekvenci, se kterou server odesílá aktualizace
- držením `S` úplně zastavíte odesílání zpráv

<APHCanvas name={'NetworkAnim'} canvasId='myCanvas2' />
