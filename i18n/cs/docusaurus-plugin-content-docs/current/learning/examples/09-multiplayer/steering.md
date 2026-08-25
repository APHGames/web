---
title: Řízení
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

Tento příklad demonstruje animaci řídícího chování (pozice a rotace) synchronizovanou mezi serverem a klientem

### Zdroj
- zdroj: [examples/src/09-network/network-steering.ts](https://github.com/APHGames/examples/blob/main/src/09-network/network-steering.ts)

### Architektura
<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/network/architecture.svg')} />
</div>

- tento příklad je pouze simulace - zdrojový kód obsahuje modul `UDP Mock`, který simuluje nespolehlivé připojení
- modul lze nakonfigurovat pro imitaci ztráty paketů, zpoždění a přeuspořádání

### Ovládání
- klikněte na druhovou obrazovku pro připojení klávesnice k serverovému canvasu
- klávesy `Q` a `W` upravují frekvenci, se kterou server odesílá aktualizace
- držením `S` úplně zastavíte odesílání zpráv

<APHCanvas name={'NetworkSteering'} canvasId='myCanvas2' />
