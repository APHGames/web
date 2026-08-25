---
title: Interaktivní
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'


Tento příklad demonstruje synchronizaci mezi klientem a serverem


### Zdroj
- zdroj: [examples/src/09-network/network-interactive.ts](https://github.com/APHGames/examples/blob/main/src/09-network/network-interactive.ts)

### Architektura
<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/network/architecture.svg')} />
</div>

- tento příklad je pouze simulace - zdrojový kód obsahuje modul `UDP Mock`, který simuluje nespolehlivé připojení
- modul lze nakonfigurovat pro imitaci ztráty paketů, zpoždění a přeuspořádání

### Ovládání
- klikněte na libovolný canvas pro vytvoření nového prvku. Synchronizuje se s druhým klientem

<APHCanvas name={'NetworkInteractive'} canvasId='myCanvas2' />
