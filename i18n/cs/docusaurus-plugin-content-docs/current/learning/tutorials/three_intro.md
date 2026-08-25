---
title: Úvod do ThreeJS
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';

## ThreeJS
- HTML5 3D animační engine
- 3D JavaScriptová knihovna
- Založená na WebGL
- Plný scénový graf, sprity, meshe, LOD, kamera, shadery, animace
- **Ideální pro jakoukoli 3D scénu ve webové stránce**

### Odkazy
- [hlavní stránka](https://threejs.org/)
- [github](https://github.com/mrdoob/three.js/)
- [dokumentace](https://threejs.org/docs/index.html)
- [příklady](https://threejs.org/examples)

## Architektura

### Jmenné prostory
- toto je pouze podmnožina, celkem je přes 600 tříd

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-threejs/diag_threejs_packages.svg')} />
</div>

### Zobrazovací entity
- **EventDispatcher** - rodič všech zobrazitelných tříd, implementuje systém založený na událostech
- **Object3D** - základní třída pro 3D objekty
- **Audio** - nepozicionální audio objekt
- **Bone** - kost, která je součástí kostry
- **Sprite** - plocha vždy otočená směrem ke kameře
- **Camera** - abstraktní třída pro všechny kamery
- **CubeCamera** - skupina 6 kamer renderujících do WebGLCubeRenderTarget
- **Group** - přidává schopnost správně pracovat se skupinami
- **Points** - 3D body v prostoru
- **SVGObject** - třída zobrazující SVG vektorové obrázky
- **LightHelper** - zobrazuje pomocný objekt pro světla (např. kužel pro SpotLight)
- **Light** - abstraktní základní třída pro světla
- **Line** - úsečka
- **LOD** - obal pro objekty vykreslované technikou LOD
- **Mesh** - objekty založené na trojúhelníkovém polygonovém meshi
- **Scene** - scéna, do které lze umísťovat objekty, světla a kamery

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-threejs/diag_threejs_classes.svg')} />
</div>


## Základní nastavení

```typescript
import * as THREE from 'three';

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( canvas.width, canvas.height );

// přidat krychli
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
let cube = new THREE.Mesh( geometry, material );

let scene = new THREE.Scene();
scene.add( cube );

camera.position.z = 5;

// herní smyčka
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```

### Parametry WebGLRenderer

```typescript
export interface WebGLRendererParameters {
	canvas?: HTMLCanvasElement | OffscreenCanvas; // canvas pro vykreslování
	context?: WebGLRenderingContext; // kontext WebGL rendereru
	alpha?: boolean; // povoluje alfa kanál
	antialias?: boolean; // povoluje vyhlazování
    depth?: boolean; // povoluje hloubkový buffer
    stencil?: boolean; // povoluje stencil buffer
```

### Atributy kamery

```typescript
    fov: number,     // zorné pole
    aspect: number,  // poměr stran
    near: number,  // blízká rovina
    far: number  // vzdálená rovina
```


### Aktualizační smyčka

- neexistuje ticker. Je třeba připojit animační smyčku k událostní smyčce voláním `requestAnimationFrame()`
- pro měření času lze použít objekt `Clock`

```typescript
const clock = new THREE.Clock();

// spustit hodiny
clock.start();

function animate() {
    requestAnimationFrame( animate );

    // získat delta
    const elapsedTime = clock.getDelta();
    // ... aktualizace modelu

    // vykreslení scény
    renderer.render( scene, camera );
}
animate();
```

### Načítání
- pro každý typ zdroje existuje speciální loader
  - `AudioLoader` pro zvuk
  - `FileLoader` pro soubory
  - `FontLoader` pro fonty
  - `ImageLoader` pro obrázky
  - `LoadingManager` pro načítání na základě událostí
  - `MaterialLoader` pro materiály
  - `TextureLoader` pro textury

```typescript
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('./assets/icon.png');
```

### Pozicování

- transformace jsou podobné jako v PixiJS
  - `position`
  - `rotation` (Eulerovy úhly)
  - `quaternion` (pro globální rotaci)
  - `scale`

## Cvičení
- **cvičení se vztahuje k verzi projektu s tagem 4.2**

- jděte do `examples\src\02-three-intro\sprites.ts`
- postupujte podle pokynů v blocích TODO a vykreslete animované částice podle obrázku níže
- canvas je k dispozici na `http://localhost:1234/02_sprites.html`

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-threejs/exercise_particles.jpg')} />
</div>
