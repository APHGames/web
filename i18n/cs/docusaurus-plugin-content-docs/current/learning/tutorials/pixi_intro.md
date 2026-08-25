---
title: Úvod do PixiJS
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';

## PixiJS
- HTML5 herní engine
- Lehká 2D JavaScriptová knihovna
- Podporuje Canvas API i WebGL (od verze 5 pouze WebGL)
- Plný scénový graf, sprite sheety, filtry, shadery
- Podobný hernímu enginu PhaserJS (ale výrazně rychlejší)
- **Ideální pro jednoduché hry a rychlé prototypování**

### Odkazy
- [hlavní stránka](https://www.pixijs.com/)
- [github](https://github.com/pixijs/pixi.js)
- [dokumentace](https://pixijs.download/dev/docs/index.html)
- [příklady](https://pixijs.io/examples/#/demos-basic/container.js)

## Architektura

### Jmenné prostory
- toto je pouze podmnožina, celkem je přes 500 tříd

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/diag_pixi_packages.svg')} />
</div>

- **systems** - jednotlivé komponenty vykreslovacího pipelinu
- **resources** - zdroje používané BaseTexture pro zpracování různých typů médií
- **interaction** - zpracování vstupních událostí (klávesnice, myš, dotykový displej)
- **prepare** - asynchronní příprava vykreslovacího pipelinu
- **extract** - funkce specifické pro renderer pro export obsahu
- **settings** - přizpůsobitelné globální hodnoty (výchozí rozlišení, snímková frekvence,...)
- **utils** - obecné nástroje
- **filters** - filtry zobrazení pouze pro WebGL

### Třídy
- **Application** - vstupní třída PIXI, měla by být rozšiřována
- **Runner** - alternativa k signálům, vhodná pro rozesílání zpráv mnoha objektům každý snímek
- **State** - stav WebGL
- **Transform** - transformační entita
- **Ticker** - aktualizační smyčka
- **Loader** - načítač zdrojů
- **Shader** - pomocná třída pro GPU shadery
- **Spritesheet** - pomocná třída pro správu odkazů na kolekci textur

### Zobrazovací entity

- **EventEmitter** - vysoce výkonný emitor událostí, podobný výchozímu emitoru NodeJS
- **DisplayObject** - základní třída všech vykreslitelných objektů
- **Container** - kolekce zobrazitelných objektů
- **Mesh** - základní mesh pro vykreslování jakýchkoli WebGL vizuálů
- **Sprite** - základní třída všech texturovaných objektů
- **Graphics** - třída pro kreslení primitivních tvarů (čáry, kružnice, obdélníky)
- **ParticleContainer** - velmi rychlá verze Container pro kreslení mnoha spritů
- **BitmapText** - velmi rychlý renderer bitmapového textu (textury jsou předem načteny)
- **Renderer** - třída vykreslující scénu na WebGL canvas
- **BaseTexture** - obal pro obrázky textur
- **BaseRenderTexture** - speciální textura umožňující vykreslení libovolného objektu do ní
- **CubeTexture** - textura obrázek/canvas/video/svg
- **Texture** - BaseTexture s metadaty
- **RenderTexture** - RenderTexture s metadaty

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/diag_pixi_classes.svg')} />
</div>


### DisplayObject

- **vlastnosti**
  - alpha, angle, buttonMode, cursor, filters, hitArea, interactive, localTransform, name, parent, pivot, position, renderable, rotation, scale, skew, transform, visible, worldAlpha, worldTransform, worldVisible, x,y, zIndex
- **metody**
  - destroy, getBounds, getGlobalPosition, getLocalBounds, render, setParent, setTransform, toGlobal, toLocal, updateTransform
- **události**
  - added, click, mousedown, mousemove, mouseout, mouseover, mouseup, removed, tap, touchcancel, touchend, touchmove, touchstart


## Zajímavé pluginy
- [pixi-filters](https://github.com/pixijs/pixi-filters) - kolekce vlastních filtrů zobrazení
- [pixi-compressed-textures](https://github.com/pixijs/pixi-compressed-textures) - komprimované textury pro Retina displeje
- [pixi-ui](https://github.com/pixijs/pixi-ui) - jednoduché uživatelské rozhraní (stále WIP)
- [pixi-particles](https://github.com/pixijs/pixi-particles) - pokročilý systém částic s editorem
- [pixi-sound](https://github.com/pixijs/pixi-sound) - přehrávací knihovna WebAudio API
- [pixi-viewport](https://github.com/davidfig/pixi-viewport) - vysoce konfigurovatelný viewport kamery
- [PixiTweener](https://github.com/theGolyo/PixiTweener) - jednoduchý tweener pro animace
- [pixi5-dragonbones](https://github.com/kreezii/pixi5-dragonbones) - plugin pro dragonbone animace
- [pixi5-svg](https://github.com/eXponenta/pixi5-svg) - podpora SVG
- [pixi-after-effects](https://github.com/blastrain/pixi-after-effects) - podpora After-Effects animací
- [pixi-inspector](https://github.com/bfanger/pixi-inspector) - Chrome DevTools pro inspekci scény
- [SpritesheetGenerator](https://github.com/cixzhang/SpritesheetGenerator) - generátor sprite sheetů

## DevTools
- pro ladění a úpravu PIXIJs scény lze použít [PixiJS devtools](https://chrome.google.com/webstore/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/chrome_plugin.jpg')} />
</div>

## Základní nastavení

```typescript
import * as PIXI from "pixi.js";
 
export default class MyPixiApp extends PIXI.Application {
 
  constructor(view: HTMLCanvasElement) {
    super({ view });
 
    this.ticker.add(deltaTime => this.update(deltaTime));
  }
 
  update(deltaTime: number) {
    // herní smyčka
  }
}
```

- doporučuje se vytvořit novou třídu a rozšířit `PIXI.Application`
- jediným povinným parametrem je entita `view`, což by měl být HTML canvas

### Ostatní atributy

```typescript
  autoStart: boolean, // automaticky spustí herní smyčku
  width: number, // šířka canvasu (v px)
  height: number, // výška canvasu (v px)
  view: HTMLCanvasElement, // odkaz na canvas
  transparent: boolean, // pokud true, canvas bude průhledný
  autoDensity: boolean, // zda mají být CSS rozměry změněny na rozměry obrazovky
  antialias: boolean, // nastaví vyhlazování
  preserveDrawingBuffer: boolean, // pokud true, zachovává stencil buffer 
  resolution: number, // globální měřítko obrazovky (výchozí 1)
  forceCanvas: boolean, // zabrání výběru WebGL
  backgroundColor: number, // barva pozadí canvasu
  clearBeforeRender: boolean, // pokud true, vymaže canvas před dalším vykreslovacím cyklem
  forceFXAA: boolean, // vynutí FXAA vyhlazování
  powerPreference: string, // parametr WebGL pro zařízení s více GPU
  sharedTicker: boolean, // pokud true, používá globální ticker pro aktualizace
  sharedLoader: boolean, // pokud true, používá globální loader
  resizeTo: Window | HTMLElement, // změní velikost na vlastní HTML element
```

### Aktualizační smyčka

- možnost 1: pomocí interního tickeru PIXI

```typescript
let ticker = this.ticker;
// zabrání automatickému spuštění
ticker.autoStart = false;
// zastaví ticker
ticker.stop();
// spustí ticker, pokud autoStart je false
ticker.start();
// zde zaregistrujeme naši aktualizační metodu
ticker.add(delta => this.ourUpdateMethod(delta));
```

- možnost 2: pomocí animation frame JavaScriptového enginu

```typescript
ticker.autoStart = false;
ticker.stop();
let myUpdateLoop =(time) => {
    ticker.update(time);
    this.renderer.render(this.stage);
    requestAnimationFrame(myUpdateLoop);
}
myUpdateLoop(performance.now());
```

### Načítání
- Loader je zodpovědný za asynchronní načítání zdrojů (fonty, obrázky, zvuky, sprite sheety)

```typescript
let loader = this.loader;
// řetězitelné `add` pro zařazení zdroje do fronty
loader.add('mySprite', 'data/sprite.png') // první parametr je alias
      .add('spritesheet', 'assets/spritesheet.json')
      .add('bitmapFont', 'assets/score.fnt');
 
// načítání je asynchronní !!
loader.load((loader, resources) => {
  // inicializace zbytku hry a spuštění tickeru
});
 
// události loaderu
loader.onProgress.add(() => {}); // volána jednou pro každý načtený/chybný soubor
loader.onError.add(() => {}); // volána jednou pro každý chybný soubor
loader.onLoad.add(() => {}); // volána jednou pro každý načtený soubor
loader.onComplete.add(() => {}); // volána jednou, když jsou všechny zdroje načteny
```

### Pozicování

- position, rotation, scale, zIndex
- **rotation** - rotace v radiánech
- **pivot** - počátek objektu v px (rotace je vždy kolem počátku)
- **anchor** - relativní počátek objektu (pouze pro Sprites)
- měřítko rodiče ovlivňuje jednotky jeho potomků (běžné chování všech grafických knihoven)
- pivot není ovlivněn měřítkem, vždy bere v úvahu velikost objektu v px
- **stage** je kořenový prvek scénového grafu
- **getBounds()** - načte hranice objektu, lze použít ke zjištění polohy objektu
- **toGlobal()** - vypočítá globální pozici
- **toLocal()** - vypočítá lokální pozici relativně k jinému bodu


## Cvičení
- **všechna cvičení se vztahují k verzi projektu s tagem 4.2**

### Primitivní tvary
- jděte do `examples/src/02-pixi-intro/primitives.ts`
- postupujte podle pokynů v bloku TODO a nakreslete obrázek níže
- canvas je k dispozici na `http://localhost:1234/02_primitives.html`

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/exercise_primitives.jpg')} />
</div>

### Text
- jděte do `examples/src/02-pixi-intro/text.ts`
- postupujte podle pokynů v bloku TODO a nakreslete animovaný text
- canvas je k dispozici na `http://localhost:1234/02_text.html`

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/exercise_text.jpg')} />
</div>

### Částice
- jděte do `examples/src/02-pixi-intro/particles.ts`
- postupujte podle pokynů v bloku TODO a vytvořte rotující částice
- canvas je k dispozici na `http://localhost:1234/02_particles.html`

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/exercise_particles.jpg')} />
</div>

### Zvuk
- jděte do `examples/src/02-pixi-intro/sound.ts`
- postupujte podle pokynů v bloku TODO a přehrajte zvuk při kliknutí na sprite
- canvas je k dispozici na `http://localhost:1234/02_sound.html`

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/exercise_sound.jpg')} />
</div>
