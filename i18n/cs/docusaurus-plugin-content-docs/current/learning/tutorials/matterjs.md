---
title: Matter JS
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';

## Matematické funkce JavaScriptu
- `Math.pow(x, y)` - vrátí hodnotu x na mocninu y
- `Math.sqrt(x)` - vrátí druhou odmocninu x
- `Math.ceil(x)` - vrátí hodnotu x zaokrouhlenou nahoru na nejbližší celé číslo
- `Math.floor(x)` - vrátí hodnotu x zaokrouhlenou dolů na nejbližší celé číslo
- `Math.trunc(x)` - vrátí celočíselnou část čísla
- `~a` - invertuje bity operandu
- `a << b` - posune a o b bitů doleva
- `a >> b` - posune a o b bitů doprava
- `a >>> b` - posune a o b bitů doprava, zleva doplňuje 0
- `Math.atan(x)` - vrátí arkustangens (v radiánech) čísla
- `Math.atan2(y, x)` - vrátí úhel v rovině (v radiánech) mezi kladnou osou x a paprskem z (0, 0) do bodu (x, y)
- `Math.random()` - vygeneruje náhodné číslo v rozsahu (0, 1)
- `min + Math.floor((max - min + 1) * Math.random())` - vygeneruje náhodné celé číslo v rozsahu [min, max] včetně
- `Math.random() > (1 - probability)` - zkontroluje výskyt události s danou pravděpodobností
- **pro všechny bitové operace jsou operandy převedeny na 32bitová celá čísla**
- každá bitová operace převede čísla na celá čísla (odstraní desetinnou část)
- pokud pracujeme s kladnými čísly, `~~v` je běžnou volbou pro získání celočíselné části

|hodnota/funkce|`trunc`|`floor`|`ceil`|`round`|`~~x`| x&#124;0 | `x << 0`| `x >> 0` |
|---|---|--|--|--|--|--|--|--|
|3.8|3|3|4|4|3|3|3|3|
|3.2|3|3|4|3|3|3|3|3|
|-3.2|-3|-4|-3|-3|-3|-3|-3|-3|
|-3.8|-3|-4|-3|-4|-3|-3|-3|-3|

- [Příklad Missile](../examples/dynamics/missile)

## MatterJS
- [https://brm.io/matter-js/](https://brm.io/matter-js/)
- 2D fyzikální engine
- funkce
  - tuhá tělesa, složená tělesa, kompozitní tělesa, konkávní a konvexní obálky, restituce, hybnost, tření, události, vazby, gravitace, spící tělesa, statická tělesa

### Architektura
- `Body` - statická třída obsahující metody pro vytváření a manipulaci s modely těles
- `IBodyDefinition` - struktura uchovávající všechny atributy
- `ICompositeDefinition` - struktura definující kompozitní objekty sestávající z těles a vazeb
- `Composite` - statická třída obsahující metody pro manipulaci s kompozitními objekty
- `IPair` - obsahuje atributy pro kolizní pár dvou těles
- `IConstraintDefinition` - obsahuje atributy pro vazbu spojující tělesa za účelem simulace interakce
- `Events`
  - `sleepStart`, `sleepEnd`, `beforeAdd`, `afterAdd`, `beforeRemove`, `afterRemove`, `afterUpdate`, `beforeRender`, `afterRender`, `beforeUpdate`, `collisionActive`, `collisionEnd`, `collisionStart`, `beforeTick`, `tick`, `afterTick`, `beforeRender`, `afterRender`, `mousedown`, `mousemove`, `mouseup`
- `Bodies` - statická třída s metodami pro vytváření nových jednoduchých těles
- `Composites` - statická třída s metodami pro vytváření složitých objektů
  - `car` - vytvoří kompozit s jednoduchým nastavením auta z těles a vazeb
  - `chain` - propojí všechna tělesa v daném kompozitu vazbami
  - `mesh` - propojí tělesa v kompozitu vazbami v mřížkovém vzoru
  - `softBody` - vytvoří jednoduché měkké těleso
- `Bounds` - statické metody pro definování vnějších hranic scény

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/06-matterjs/architecture.svg')} />
</div>

### Jednoduché nastavení

```typescript
let engine = Matter.Engine.create();
let world = engine.world;
let render = Matter.Render.create({ 
    element: document.body,
    engine: engine });

Render.run(render);
 
// vložit objekty
Matter.World.add(world, Matter.Composites.car(150, 100, 150, 30, 30));
 
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
// nastavit kameru
Matter.Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 }
});
```

### MatterJS a PIXI
- MatterJS má vlastní renderer
- pro propojení MatterJS s Pixi je třeba vytvořit kopii každého MatterJS tělesa a synchronizovat ho
- v `libs/pixi-matter` se nachází malá knihovna propojující MatterJS s `pixi-ecs` pomocí třídy `MatterBind`
- aktualizace může být řešena automaticky pomocí `MatterJS.Runner` nebo ručně voláním `Matter.Runner.tick`
- příklady použití lze nalézt v `examples/06-physics`
- PIXI objekty synchronizují své pozice a rotace se svými MatterJS protějšky. Proto je třeba pohybovat MatterJS objekty, aby se pohybovaly PIXI objekty s nimi synchronizované, **nikoliv naopak!**
- mějte na paměti, že `pixi-matter` je experimentální a vyžaduje další práci, pokud ho chcete použít ve své hře

```typescript
// vytvořit binder
const binder = new PixiMatter.MatterBind();
binder.init(this.engine.scene, {
        mouseControl: true, // umožní ovládání MatterJS objektů myší
        renderConstraints: true, // vykreslí vazby
        renderAngles: true, // vykreslí úhly (červené horizontální půlčáry, pokud je úhel 0)

});

// přidat tělesa
Matter.World.add(binder.mWorld, [
    Matter.Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
]);}

// alternativa (vrátí synchronizační objekt)
binder.addBody(Matter.Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }));
```

- co když chceme použít ECS komponenty pro náš MatterJS příklad?
  - jak bylo uvedeno výše, `MatterBind` přidá nový objekt do PIXI, jakmile je těleso nebo vazba přidána do MatterJS světa (pomocí háčku `afterAdd`)
  - tento objekt lze používat jako běžný PIXI-ECS objekt (rozšiřuje `ECS.Container`)
  - máme dvě možnosti jak přistupovat k synchronizovaným objektům
    - a) zavolat `binder.findSyncObjectForBody(body)` - PIXI protějšky mají specifická jména podle vzoru: `matter_body_<matterid>`
    - b) přidat objekt do světa voláním `binder.addBody(body)` - tato metoda vrátí PIXI objekt synchronizovaný s Matter objektem

<div className={styles.figure}>
  <img className={styles.fill} src={useBaseUrl('img/docs/tutorials/06-matterjs/lifecycle.svg')} />
</div>
