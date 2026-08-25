---
title: Náhodné rozdělení
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- zdroj: [examples/src/04-space/distribution.ts](https://github.com/APHGames/examples/blob/main/src/04-space/distribution.ts)
- Normální rozdělení je generováno z rovnoměrného rozdělení pomocí `Box-Mullerovy transformace`
  - algoritmus: [examples/libs/aph-math/procedural/random.ts](https://github.com/APHGames/examples/blob/main/libs/aph-math/procedural/random.ts)

### Normální rozdělení

<APHCanvas name={'DistributionNormal'} width={400} height={300} />

### Rovnoměrné rozdělení

<APHCanvas name={'DistributionUniform'} width={400} height={300} />
