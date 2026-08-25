---
title: Mandelbrotova množina
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';
import APHCanvas from '@site/src/APHCanvas.tsx'

### Co je Mandelbrotova množina
- fraktálový objekt generovaný touto rekurentní funkcí: `z[n+1] <- z[n] + c`
- `c` je komplexní číslo, `z` začíná od 0
- komplexní čísla lze celkem snadno mapovat na vektory, je však důležité mít na paměti, že aritmetické operace musí být prováděny v komplexním oboru
- barva reprezentuje číslo, kde iterace v daném bodě zastavila
- [Wikipedia](https://en.wikipedia.org/wiki/Mandelbrot_set)

### Zdroj
- zdroj: [examples/src/07-graphics/mandelbrot.ts](https://github.com/APHGames/examples/blob/main/src/07-graphics/mandelbrot.ts)
- vertex shader: [assets/07-graphics/shaders/mandelbrot.vert](https://github.com/APHGames/examples/blob/main/assets/07-graphics/shaders/mandelbrot.vert)
- fragment shader: [assets/07-graphics/shaders/mandelbrot.frag](https://github.com/APHGames/examples/blob/main/assets/07-graphics/shaders/mandelbrot.frag)

<APHCanvas name={'Mandelbrot'} />
