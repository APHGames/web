---
title: Rotace
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- zdroj: [examples/src/05-dynamics/rotation.ts](https://github.com/APHGames/examples/blob/main/src/05-dynamics/rotation.ts)
  - <span className={styles["color-tomato-light"]}>červená barva:</span> implicitní Eulerova metoda, klesající energie
  - <span className={styles["color-lemon"]}>žlutá barva</span>: explicitní Eulerova metoda
  - <span className={styles["color-royal"]}>modrá barva</span>: vylepšená Eulerova metoda, rostoucí energie

### Frekvence 60 FPS

<APHCanvas name={'Rotation'} frequency={60} />

### Frekvence 20 FPS

<APHCanvas name={'Rotation'} frequency={20} />

### Frekvence 10 FPS

<APHCanvas name={'Rotation'} frequency={10} />

### Frekvence 2 FPS

<APHCanvas name={'Rotation'} frequency={2} />
