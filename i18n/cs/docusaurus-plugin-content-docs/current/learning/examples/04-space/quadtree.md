---
title: Quad strom
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- zdroj: [examples/src/04-space/quadtree.ts](https://github.com/APHGames/examples/blob/main/src/04-space/quadtree.ts)


### Řídký strom

```typescript
{
    objectNum: 20;
	maxObjectsInLeaf: 5;
	maxTreeLevels: 2;
}
```

<APHCanvas name={'QuadTree'} objectNum={20} maxObjectsInLeaf={5} maxTreeLevels={2} />

### Agresivní dělení

```typescript
{
    objectNum: 50;
	maxObjectsInLeaf: 2;
	maxTreeLevels: 4;
}
```

<APHCanvas name={'QuadTree'} objectNum={50} maxObjectsInLeaf={2} maxTreeLevels={4} />

### Hustý strom

```typescript
{
    objectNum: 500;
	maxObjectsInLeaf: 20;
	maxTreeLevels: 4;
}
```

<APHCanvas name={'QuadTree'} objectNum={180} maxObjectsInLeaf={4} maxTreeLevels={8} />
