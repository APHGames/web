---
title: Datové struktury
---

import useBaseUrl from '@docusaurus/useBaseUrl';

- zelené čáry pro kladný výsledek rozhodovacích prvků
- červené čáry pro záporný výsledek rozhodovacích prvků

<img src={useBaseUrl('img/docs/cheatsheets/data_structures.svg')} />

### Složitost map
- HashMap
  - složitost O(1) pro vkládání a vyhledávání.
  - umožňuje jeden null klíč a více null hodnot.
  - nezachovává žádné pořadí.
- TreeMap
  - složitost O(logN) pro vkládání a vyhledávání.
  - neumožňuje null klíč, ale umožňuje více null hodnot.
  - zachovává pořadí. Ukládá klíče v seřazeném vzestupném pořadí.
- LinkedHashMap
  - složitost O(1) pro vkládání a vyhledávání.
  - umožňuje jeden null klíč a více null hodnot.
  - zachovává pořadí, ve kterém byly vloženy dvojice klíč-hodnota.
