---
title: Pronásledující boti
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

### Zdroj
- zdroj: [examples/src/08-ai/pursue/index.ts](https://github.com/APHGames/examples/blob/main/src/08-ai/pursue/index.ts)

### Popis
- šipkami ovládejte druhého bota
- AI bot začne pronásledovat druhého bota, jakmile vstoupí do jeho kužele viditelnosti
- jakmile AI bot ztratí přehled, pokusí se prohledat nejbližší dlaždice
- po určitém počtu iterací přejde AI bot zpět do režimu náhodné chůze

<APHCanvas name={'Pursue'} />
