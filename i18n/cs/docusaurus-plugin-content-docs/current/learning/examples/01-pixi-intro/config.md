---
title: Konfigurace
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

- zdroj: [examples/src/01-helloworld/pixi.ts](https://github.com/APHGames/examples/blob/main/src/01-helloworld/pixi.ts)


### Průhledný canvas

```typescript
{
    transparent: true,
    antialias: true,
}
```

<APHCanvas name='PixiHelloWorld' transparent={true} antialias={true} resolution={1} />

### Vyhlazování vypnuto

```typescript
{
    transparent: false,
    backgroundColor: 0x000000
    antialias: false,
}
```

<APHCanvas name='PixiHelloWorld' backgroundColor={0x000000} antialias={false}  />

### Bílé pozadí

```typescript
{
    transparent: false,
    backgroundColor: 0xffffff
    antialias: true,
}
```

<APHCanvas name='PixiHelloWorld' backgroundColor={0xFFFFFF} antialias={true} />
