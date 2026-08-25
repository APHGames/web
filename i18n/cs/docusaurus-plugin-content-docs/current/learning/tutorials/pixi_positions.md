---
title: Pozicování v PixiJS
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';

### Atributy
- position, rotation, scale, pivot, anchor
- `rotation` - rotace kolem osy Z v radiánech
- `pivot` - počátek objektu v px
  - rotace je vždy měřena kolem počátku
  - měřítko pivot neovlivňuje
- `anchor` - relativní počátek objektu (pouze pro Sprites)
- `stage` - kořenový prvek scénového grafu
- `getBounds()` - načte hranice objektu, lze použít ke zjištění polohy objektu
- `toGlobal()` - vypočítá globální pozici
- `toLocal()` - vypočítá lokální pozici relativně k jinému bodu

:::note

měřítko rodiče ovlivňuje jednotky jeho potomků

:::


### Příklady

- **pozicování jednoho prvku**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_single_1.svg')} />
</div>

___
- **rotace je kolem počátku/pivotu, který je ve výchozím nastavení v levém horním rohu**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_single_rot_1.svg')} />
</div>

___
- **pivot také ovlivňuje posunutí polohy objektu**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_single_2.svg')} />
</div>

___
- **s pivotem uprostřed lze objekt otáčet kolem jeho středu**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_single_rot_2.svg')} />
</div>

___
- **měřítko nadřazených objektů ovlivňuje jednotky jejich potomků**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_multi_1.svg')} />
</div>

___
- **stejné hodnoty, ale čtverce jsou nezávislé**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_multi_2.svg')} />
</div>

___
- **zelený a modrý čtverec jsou potomky červeného čtverce**

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/02-pixi/pos_multi_3.svg')} />
</div>
