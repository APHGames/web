---
title: Nákladní boti
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

### Zdroj
- zdroj: [examples/src/08-ai/bots/index.ts](https://github.com/APHGames/examples/blob/main/src/08-ai/bots/index.ts)

<APHCanvas name={'Bots'} />

### Entity
- sandbox bez hráče
- jsou zde zdroje benzínu a železa
- boti je musí přivézt do skladu
- pokud sklad obsahuje dostatek nákladu (30 železo a 10 benzín), továrna postaví nového bota
- každý zdroj má svou vlastní kapacitu - pokud je kapacita vyčerpána, jeho ikona zčerná

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/bots/bots_desc.svg')} />
</div>

### Stavy

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/bots/bots_states.svg')} />
</div>

### Model komponent
- celý model je uložen v `model.ts`
- `GameModel` obsahuje mapu a globální atributy
- `BotModel` je model pro každého bota
- `CargoSourceModel` je model pro rudy železa a ropné plošiny
- `WarehouseModel` a `FactoryModel` jsou modely pro budovy
- komponenty připojené k botům jsou zodpovědné za pohyb a AI logiku
- AI logika je implementována v komponentě `BotAI`
- boti používají **hledání cesty a řídící chování** pro pohyb
- každý handler stavu má svou vlastní metodu
  - `processIdleState`
  - `processGoingToLoadState`
  - `processGoingToUnloadState`
  - `processLoadingState`
  - `processUnloadingState`

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/bots/bots_components.svg')} />
</div>
