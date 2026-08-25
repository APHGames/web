---
title: COLFIO Docs
description: Dokumentace knihovny PIX-ECS
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/css/docs.module.scss';

- dokumentace ke knihovně `COLFIO`, která se nachází v repozitáři

## Architektura Pixi


<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/tutorials/02-pixi/diag_pixi_classes.svg')} />
</div>

## Knihovna COLFIO
- minimalistická knihovna pro NI-APH implementující ECS vzor s nejdůležitějšími nástroji
- nachází se v `examples/libs/pixi-ecs`
- **funkce**
  - object builder
  - správce scény
  - PIXI-ECS propojení
  - messaging vzor
  - reaktivní komponenty
  - stavy, příznaky a tagy
  - jednoduché ladící okno
  - obsluha klávesnice a ukazatele

### Architektura

- **PIXI.Application**
  - PIXI aplikace
- **PIXI.Ticker**
  - PIXI hodiny pro herní smyčku
- **PIXI.Container, PIXI.Sprite,...**
  - PIXI herní objekty
- **ECS.Engine**
  - vstupní bod do knihovny, přijímá konfigurační objekt a inicializuje PIXI herní smyčku
- **ECS.Scene**
  - správce scény, umožňuje dotazování na komponenty a herní objekty, spravuje globální komponenty
- **ECS.Component**
  - funkční komponenty herních objektů
  - globální komponenty jsou připojeny k objektu `stage`
- **ECS.GameObject**
  - rozhraní deklarující rozšiřující metody pro PIXI kontejnery
  - ve starších verzích všechny komponenty a `Scene` pracovaly s kontejnery přes rozhraní `GameObject` a přístup k PIXI atributům vyžadoval použití přetypovacích funkcí jako ˙asContainer()˙. Aktuální verze používá zděděný ˙ECS.Container˙, takže je možné přistupovat k `ECS` i `PIXI` funkcím zároveň. Rozhraní `GameObject` se nyní používá pouze interně pro odvozené objekty, aby bylo zajištěno implementování všech `ECS` funkcí
- **ECS.GameObjectProxy**
  - delegát obsahující implementaci metod rozhraní `ECS.GameObject`. Používá se jako proxy příslušnými kontejnery (protože JavaScript nepodporuje vícenásobnou dědičnost)
- **ECS.Container, ECS.Sprite,...**
  - PIXI kontejnery dědící od příslušných PIXI objektů, implementující rozhraní `ECS.GameObject` a předávající implementaci na `ECS.GameObjectProxy` (aby se zabránilo duplikaci kódu)

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/arch_ecs.svg')} />
</div>

### COLFIO propojení

- místo vytváření `PIXI.Container`, `PIXI.Sprite` atd. lze vytvářet `ECS.Container`, `ECS.Sprite`,...
- tyto objekty dědí od svých protějšků v PIXI. Navíc obsahují metody z rozhraní `ECS.GameObject`
- lze s nimi zacházet stejně jako s běžnými PIXI objekty
- používají `GameObjectProxy` jako poskytovatele implementace ECS funkcí
- jakékoli funkční chování lze implementovat v komponentách, které manipulují s herními objekty, ke kterým jsou připojeny

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/arch_bridge.svg')} />
</div>

### Jak začít

- importovat ECS knihovnu
- získat canvas
- zavolat funkci `init`
- načíst zdroje pomocí `PIXI loader`
- přistoupit k `engine.scene`

```typescript

import * as ECS from '../libs/pixi-ecs';

class MyGame {
  engine: ECS.Engine;

  constructor() {
    this.engine = new ECS.Engine();
    let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);

    this.engine.init(canvas, { width: 800, height: 600 });

    this.engine.app.loader
        .reset()
        .add('spritesheet', './assets/spritesheet.png')
        .load(onAssetsLoaded);
  }

  onAssetsLoaded = () => {
      this.engine.scene.clearScene();
      const graphics = new ECS.Graphics();
      this.engine.scene.stage.addChild(graphics);
  }
}

export default new MyGame();

```

- `engine.app` je odkaz na `PIXI.Application`
- `scene.stage` je odkaz na objekt stage v PIXI
- `scene.stage.addChild(...)` umožňuje přidávání potomků k objektu stage


```typescript
let sprite = new ECS.Sprite('mySprite', PIXI.Texture.from('spritesheet'));
sprite.position.set(engine.app.screen.width / 2, engine.app.screen.height / 2);
sprite.anchor.set(0.5);
engine.scene.stage.addChild(sprite);
```

#### Konfigurace

- pro optimalizaci vyhledávání v scéně jsou všechny komponenty a objekty uloženy v hash mapách, množinách a polích
- aby se nezabíralo příliš mnoho paměti, musí být vyhledávání explicitně povoleno
  - nezapomeňte! Pokud na to zapomenete, engine vás upozorní vyvoláním chyby 🤣

```typescript
new ECS.Engine().init(canvas, {
    width: 800,
    height: 600,
    debugEnabled: true,
    flagsSearchEnabled: true,
    statesSearchEnabled: true,
}, true);
```

- `resizeToScreen` - pokud true, hra se přizpůsobí velikosti obrazovky
- `transparent` - pokud true, canvas bude průhledný
- `backgroundColor` - barva pozadí canvasu
- `antialias` - povoluje vyhlazování
- `width` - virtuální šířka canvasu
- `height` - virtuální výška canvasu
- `resolution` - měřítko zobrazených objektů (výchozí 1)
- `gameLoopType` - typ herní smyčky (FIXED, VARIABLE)
- `gameLoopThreshold` - horní práh herní smyčky v ms (výchozí 300)
- `gameLoopFixedTick` - perioda pevné herní smyčky (výchozí 16ms)
- `speed` - rychlost hry (výchozí 1)
- `flagsSearchEnabled` - povoluje vyhledávání podle příznaků
- `statesSearchEnabled` - povoluje vyhledávání podle stavů
- `tagsSearchEnabled` - povoluje vyhledávání podle tagů
- `namesSearchEnabled` - povoluje vyhledávání podle jmen
- `notifyAttributeChanges` - povoluje notifikace při změně atributu
- `notifyStateChanges` - povoluje notifikace při změně stavu
- `notifyFlagChanges` - povoluje notifikace při změně příznaku
- `notifyTagChanges` - povoluje notifikace při změně tagu
- `debugEnabled` - vloží ladicí HTML element


### Komponenty

- každé funkční chování je implementováno v komponentách
- každá komponenta je připojena k jednomu hernímu objektu
- globální komponenty jsou připojeny přímo ke stage


<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_component.svg')} />
</div>

- `id` - jedinečný identifikátor
- `name` - název komponenty
- `props` - vlastní objekt vlastností (výchozí void)
- `owner` - herní objekt, ke kterému je komponenta připojena
- `scene` - odkaz na scénu
- `fixedFrequency` - frekvence pevné aktualizační smyčky (pokud není nastavena, fixedUpdate() NEBUDE volán)
- `cmpState` - stav komponenty (NEW, INITIALIZED, RUNNING, DETACHED, FINISHED)
- `onInit()` - volána při přidání komponenty k objektu
- `onAttach()` - volána při připojení komponenty ke scéně
- `onMessage()` - volána při příchodu zprávy, k níž se komponenta přihlásila
- `onFixedUpdate()` - volána v pevném intervalu
- `onUpdate()` - volána každý snímek
- `onDetach()` - volána před odpojením komponenty od scény
- `onRemove()` - volána před odstraněním komponenty ze scény
- `onFinish()` - volána kdykoli někdo zavolá 'finish()', po níž následuje odebrání ze scény
- `subscribe()` - přihlásí k odběru zprávy daného klíče
- `unsubscribe()` - odhlásí zprávu daného klíče
- `sendMessage()` - odešle zprávu
- `finish()` - zruší provádění komponenty a okamžitě ji odebere ze scény

#### Jednoduchá komponenta

- vytvořit novou komponentu
- inicializovat ji v `onInit()`
- zpracovat příchozí zprávy v `onMessage()`
- zpracovat aktualizační smyčku v `onUpdate(delta, absolute)`

```typescript
class Movement extends ECS.Component {

  onInit() {
    this.subscribe('STOP_EVERYTHING');
  }

  onMessage(msg:  ECS.Message) {
    if(msg.action === 'STOP_EVERYTHING') {
      this.finish();
    }
  }

  onUpdate(delta: number, absolute: number) {
    this.owner.pos.set(this.owner.pos.x + 20, this.owner.pos.y);
  }
}
```

#### Životní cyklus

- **komponenty nejsou přidávány k objektům okamžitě**, ale na začátku aktualizační smyčky jejich příslušných objektů
  - okamžité spuštění lze vynutit voláním `addComponentAndRun` místo `addComponent`
- komponenty **lze opakovaně používat** - odebrat z objektu a přidat k jinému
- komponenta může být v jednom okamžiku připojena pouze k jednomu hernímu objektu
- komponenty mohou přijímat zprávy, pokud jsou spuštěny
- komponenty nemohou přijímat zprávy, které samy odeslaly
- `finish()` zastaví provádění komponent a okamžitě je odebere ze scény
- pokud má být herní objekt odstraněn, všechny jeho komponenty budou finalizovány a odebrány
- pokud je nadřazený herní objekt odpojen od scény (např. pro pozdější opětovné použití), všechny jeho komponenty budou také odpojeny a poté znovu připojeny
  - `onAttach()` je volána při připojení komponenty ke scéně. Může se tak stát ve dvou případech:
    - a) komponenta je přidána k objektu, který je již ve scéně
    - b) herní objekt je připojen ke scéně (spolu s ním i jeho komponenty)
  - pokud je komponenta odpojena, nebude aktualizována ani přijímat žádné zprávy
- **doporučení**: pokud nepotřebujete reagovat na odpojení, používejte pouze `onInit()` pro inicializaci a `onRemove()` pro vyčištění


<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/lifecycle_components.svg')} />
</div>

### Herní objekt

- herní objekt je třída dědící od příslušných PIXI kontejnerů (Container, Sprite, Text, Mesh,...)

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_gameobject.svg')} />
</div>


- `id` - jedinečný identifikátor
- `name` - název (výchozí prázdný řetězec)
- `stateId` - číselný stav
- `pixiObj` - odkaz na surový objekt
- `parentGameObject` - odkaz na rodiče
- `scene` - odkaz na scénu
- `_proxy_` - odkaz na proxy obsahující implementaci rozhraní `GameObject`
- `asContainer()` - přetypuje se na `ECS.Container`
- `asParticleContainer()` - přetypuje se na `ECS.ParticleContainer`
- `asXYZ()` - přetypuje se na kteroukoli třídu ze seznamu PIXI kontejnerů (vyvolá chybu, pokud přetypování není možné)
- `addComponent()` - přidá novou komponentu
- `findComponentByName()` - najde komponentu podle jména
- `removeComponent()` - odebere komponentu
- `assignAttribute()` - přidá nový atribut do hasmapy
- `getAttribute()` - získá atribut podle klíče
- `removeAttribute()` - odebere existující atribut
- `addTag()` - přidá tag do množiny tagů
- `removeTag()` - odebere tag
- `hasTag()` - vrátí true, pokud je daný tag v množině
- `setFlag()` - nastaví bitový příznak
- `resetFlag()` - resetuje bitový příznak
- `hasFlag()` - vrátí true, pokud je daný bitový příznak nastaven
- `invertFlag()` - invertuje daný bitový příznak
- `detach()` - odpojí objekt od scény, ale nezničí ho v PIXI
- `destroy()` - zničí objekt ze scény a z interních kolekcí PIXI a odebere všechny jeho komponenty
- `destroyChildren()` - zničí všechny potomky

```typescript
let newObject = new ECS.Sprite('warrior', warriorTexture);

// lze uložit libovolný počet atributů libovolného typu
newObject.assignAttribute('speed', 20);

// lze uložit libovolný počet tagů
newObject.addTag('projectile');

// lze uložit příznaky v rozsahu 1-128
newObject.setFlag(FLAG_COLLIDABLE);

// číselný stav pro jednoduché použití
newObject.stateId = STATE_MOVING;
```

#### Životní cyklus

- objekty jsou přidávány do herní scény **okamžitě**
- při připojení objektu ke scéně bude scéna volat aktualizační smyčku na něm (rekurzivně)
- pokud je objekt odpojen, bude odebrán ze scény, ale nebude zničen
  - odpojené objekty lze znovu přidat do scény
- pokud je objekt zničen, nelze ho již používat

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/lifecycle_objects.svg')} />
</div>


### Scéna
- slouží jako sběrnice zpráv a správce scény

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_scene.svg')} />
</div>

- `app` - odkaz na `PIXI.Application`
- `name` - název scény
- `stage` - kořenový herní objekt, odvozený od `PIXI.Container`
- `currentDelta` - aktuální delta čas
- `currentAbsolute` - aktuální herní čas
- `callWithDelay(number, function)` - vyvolá funkci s daným zpožděním
- `addGlobalComponent(cmp)` - přidá globální komponentu (připojenou ke stage)
- `findGlobalComponentByName(name)` - najde globální komponentu podle jména
- `removeGlobalComponent(component)` - odebere globální komponentu
- `assignGlobalAttribute(name, attr)` - přiřadí globální atribut ke stage
- `getGlobalAttribute(name)` - získá globální atribut podle jména
- `removeGlobalAttribute(string)` - odebere globální atribut
- `findObjectById(id)` - najde objekty podle id
- `findObjectsByQuery(query)` - najde objekty splňující podmínky dotazu
- `findObjectsByName(name)` - najde objekty podle jména
- `findObjectByName(name)` - získá první objekt daného jména
- `findObjectsByTag(tag)` - najde objekty s daným tagem
- `findObjectByTag(tag)` - získá první objekt s daným tagem
- `findObjectsByFlag(flag)` - najde objekty s nastaveným daným příznakem
- `findObjectByFlag(flag)` - získá první objekt s nastaveným daným příznakem
- `findObjectsByState(state)` - najde objekty podle číselného stavu
- `findObjectByState(state)` - získá první objekt s nastaveným číselným stavem
- `sendMessage(message)` - odešle obecnou zprávu
  - zprávy je lepší odesílat z komponent (zpráva pak nese jejich id)
- `clearScene(config)` - vymaže celou scénu

#### Dotazování na scénu

```typescript
let droids = scene.findObjectsByTag('droid');
let charged = scene.findObjectsByFlag(FLAG_CHARGED);
let idle = scene.findObjectsByState(STATE_IDLE);

let chargedIdleDroids = scene.findObjectsByQuery({
      ownerTag: 'droid',
      ownerFlag: FLAG_CHARGED,
      ownerState: STATE_IDLE
});
```

### Zpožděné volání
- nepoužívejte `setInterval()` ani `setTimeout()`, protože tyto metody jsou volány z událostní smyčky prohlížeče
- pokud chcete něco provést se zpožděním, použijte `scene.callWithDelay()`, které je voláno na konci aktualizační smyčky
- **příklad: vymazání celé scény po 3 sekundách**

```typescript
// voláno z komponenty
this.scene.callWithDelay(1000, () => this.scene.clearScene());
```


### Zasílání zpráv

- `Message` je přepravka pro mezikomunikaci komponent
- každá komponenta obsahuje metodu `sendMessage(action, data)`
- lze také použít `scene.sendMessage(Message)` pro odeslání zprávy mimo komponentu
- aby komponenta přijímala zprávy daného typu, musí se nejprve zaregistrovat přes `subscribe(action)`
- všechny zprávy jsou zpracovávány v `OnMessage()` příslušných handlerů
  - pokud `OnMessage()` handler vrátí hodnotu, bude shromážděna ve struktuře `responses`
- pokud jakákoli komponenta nastaví `expired = true`, zpráva nebude předána dále


<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_message.svg')} />
</div>

#### Příklad: Ukončení komponenty zprávou

```typescript

class Sender extends ECS.Component {

  onInit() {
    this.fixedFrequency = 1;
  }

  onFixedUpdate() {
    this.sendMessage('RECEIVER_FINISH');
  }
}

class Receiver extends ECS.Component {

  onInit() {
    this.subscribe('RECEIVER_FINISH');
  }

  onMessage(msg: ECS.Message) {
    if(msg.action === 'RECEIVER_FINISH') {
      this.finish(); // bude okamžitě odebráno ze scény
    }
  }
}

```

### Vestavěné zprávy
- `ANY` - získá všechny zprávy (dobré pro ladění)
- `OBJECT_ADDED` - objekt byl přidán do scény
- `OBJECT_REMOVED` - objekt byl odebrán
- `COMPONENT_ADDED` - komponenta byla přidána k objektu
- `COMPONENT_DETACHED` - komponenta byla odpojena od scény (spolu se svým vlastníkem)
- `COMPONENT_REMOVED` - komponenta byla odebrána
- `ATTRIBUTE_ADDED` - atribut byl přidán (odesíláno pouze když `notifyAttributeChanges = true`)
- `ATTRIBUTE_CHANGED` - atribut se změnil (odesíláno pouze když `notifyAttributeChanges = true`)
- `ATTRIBUTE_REMOVED` - atribut byl odebrán (odesíláno pouze když `notifyAttributeChanges = true`)
- `STATE_CHANGED` - stav objektu se změnil (odesíláno pouze když `notifyStateChanges = true`)
- `FLAG_CHANGED` - příznak objektu se změnil (odesíláno pouze když `notifyFlagChanges = true`)
- `TAG_ADDED` - tag byl přidán k objektu (odesíláno pouze když `notifyTagChanges = true`)
- `TAG_REMOVED` - tag byl odebrán z objektu (odesíláno pouze když `notifyTagChanges = true`)
- `SCENE_CLEAR` - celá scéna byla vymazána

#### Příklad: Sběr nových objektů přes messaging vzor

```typescript

class TreeCollector extends ECS.Component {

  trees: ECS.Container[] = [];

	onInit() {
		this.subscribe('OBJECT_ADDED');
	}

	onMessage(msg: ECS.Message) {
		if (msg.action === 'OBJECT_ADDED' && msg.gameObject.hasTag('TREE')) {
			trees.push(msg.gameObject);
		}
	}
}

```

## Vestavěné komponenty a nástroje

### Builder

- univerzální builder pro všechny typy herních objektů

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_builder.svg')} />
</div>

- `anchor()` - nastaví kotvu
- `virtualAnchor()` - nastaví kotvu pouze virtuálně pro výpočet pozic
- `relativePos()` - relativní pozice na obrazovce v rozsahu `[0, 1]`
- `localPos()` - lokální pozice
- `globalPos()` - globální pozice
- `scale()` - lokální měřítko
- `withAttribute()` - přidá atribut
- `withComponent()` - přidá komponentu
- `withFlag()` - přidá příznak
- `withState()` - přidá stav
- `withTag()` - přidá tag
- `withParent()` - nastaví rodiče
- `withChild()` - nastaví potomka Builder
- `withName()` - nastaví jméno
- `asContainer()` - nastaví cílový objekt jako kontejner
- `asGraphics()` - nastaví cílový objekt jako grafiku
- `asXYZ()` - nastaví cílový objekt jako XYZ (cokoliv z kolekce PIXI objektů)
- `buildInto()` - vloží data do existujícího objektu
- `build()` - sestaví nový objekt
- `clear()` - vymaže data

```typescript
new ECS.Builder(scene)
    .relativePos(0.5, 0.92)
    .anchor(0.5, 1)
    .withAttribute(Attributes.RANGE, 25)
    .withFlag(FLAG_COLLIDABLE)
    .withFlag(FLAG_RANGE)
    .withState(STATE_IDLE)
    .withComponent(new TowerComponent())
    .withComponent(new AimControlComponent())
    .withComponent(new ProjectileSpawner())
    .withName('tower')
    .asSprite(PIXI.Texture.from(Assets.TEX_TOWER))
    .withParent(rootObject)
.build();
```


### Chain Component

- velmi mocná implementace řetězce příkazů
- **každá akce je vázána na herní aktualizační smyčku** - komponenta aktualizuje svůj vnitřní stav a volá příkazy pouze tehdy, když je na řadě

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_chain_component.svg')} />
</div>

```typescript
// zobrazuje sekvenci otáčejících se textů v bonus módu
this.owner.addComponent(new ChainComponent()
  .beginWhile(() => this.gameModel.mode === BONUS_LEVEL)
      .beginRepeat(4)
          .waitFor(() => new RotationAnimation(0,360))
          .waitFor(() => new TranslateAnimation(0,0,2,2))
          .call(() => textComponent.displayMessage('BONUS 100 POINTS!!!'))
          .call(() => soundComponent.playSound('bonus'))
      .endRepeat()
  .endWhile()
  .call(() => viewComponent.removeAllTexts()));
 
// každých 20 sekund změní hudbu na pozadí
this.owner.addComponent(new ChainComponent()
  .waitForMessage('GAME_STARTED')
  .beginWhile(() => this.scene.stage.hasFlag(GAME_RUNNING))
    .waitTime(20000)
    .call(() => this.changeBackgroundMusic())
  .endWhile()
```

### Funkcionální komponenta

- generická komponenta sloužící jako obal pro jednoduché funkce

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_func_component.svg')} />
</div>

```typescript
new ECS.FuncComponent('view')
    .setFixedFrequency(0.1) // 1 aktualizace za 10 sekund
    .doOnMessage('UNIT_EXPLODED', (cmp, msg) => cmp.playSound(Sounds.EXPLOSION))
    .doOnMessage('UNIT_SPAWNED', (cmp, msg) => cmp.displayWarning(Warnings.UNIT_RESPAWNED))
    .doOnFixedUpdate((cmp, delta, absolute) => cmp.displayCurrentState())
```

### Key-Input Component
- jednoduchý handler klávesnice, který pouze ukládá stisknuté klávesy
- neodesílá žádné zprávy, musí být dotazován ručně

```typescript
// Factory.ts
initGame(scene: ECS.Scene) {
  ...
  // KeyInputComponent je třeba přidat globálně
  scene.addGlobalComponent(new KeyInputComponent());
  ...
}

// CannonInputController.ts
export class CannonInputController extends CannonController {

onUpdate(delta: number, absolute: number) {
    // za předpokladu, že jsme tuto komponentu přidali ke stage
    let cmp = this.scene
      .findGlobalComponentByName<KeyInputComponent>(ECS.KeyInputComponent.name);
 
    if (cmp.isKeyPressed(ECS.Keys.KEY_LEFT)) {
      this.turnLeft();
    }
 
    if (cmp.isKeyPressed(ECS.Keys.KEY_RIGHT)) {
      this.turnRight();
    }
  }
}
```

### Pointer-Input Component
- globální handler ukazatele
- PIXI má vestavěnou podporu pro události myši; tato komponenta zpracovává události myši/ukazatele pro celý canvas
- na rozdíl od `Key-Input Component` používá messaging vzor pro notifikaci pozorovatelů
- komponenta zpracovává jak myš, tak ukazatel
- **konfigurace**
  - je třeba explicitně nakonfigurovat, které události mají být zachycovány
  - `handleClick` zachytí akce stisknutí/uvolnění

```typescript
// přidat komponentu
obj.addComponent(new ECS.PointerInputComponent( {
  handleClick: false,
  handlePointerDown: true,
  handlePointerOver: true,
  handlePointerRelease: true, 
}));

```
- poté lze odebírat následující zprávy (enum se nachází v `ECS.PointerMessages`):
  - `pointer-tap`
  - `pointer-down`
  - `pointer-over`
  - `pointer-release`

### Virtual-Gamepad Component
- jednoduchý gamepad rozšiřující `KeyInputComponent` a překládající kliknutí na klávesy
- pokud nahradíte `KeyInputComponent` za `VirtualGamepadComponent`, hra by neměla poznat rozdíl
- **konfigurace**
  - je třeba poskytnout mapování kláves
  - pokud některé klávesy vynecháte, příslušná tlačítka se nebudou vykreslovat

```typescript
		this.engine.scene.addGlobalComponent(new ECS.VirtualGamepadComponent({
			KEY_UP: ECS.Keys.KEY_UP,
			KEY_DOWN: ECS.Keys.KEY_DOWN,
			KEY_LEFT: ECS.Keys.KEY_LEFT,
			KEY_RIGHT: ECS.Keys.KEY_RIGHT,
			KEY_A: ECS.Keys.KEY_SPACE,
			KEY_B: ECS.Keys.KEY_ENTER,
			KEY_X: ECS.Keys.KEY_ALT,
			KEY_Y: ECS.Keys.KEY_SHIFT
		}));
```

- po konfiguraci bude scéna obsahovat vykreslený gamepad

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/virtual_gamepad.jpg')} />
</div>

### Vektor
- pomocná třída pro vektory

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/class_vector.svg')} />
</div>

### Responzivní režim
- pokud chcete, aby se hra zobrazovala v režimu celé obrazovky, škálující se s oknem prohlížeče, máte 2 možnosti:
  - 1) nastavit `resizeToScreen` na `true` při inicializaci enginu
  - 2) přidat query string `?responsive`


### Debug Component

- ladicí komponenta připojí ladicí panel vedle canvasu
- tři způsoby:
  - 1) přidat `DebugComponent` ke stage
  - 2) přidat query string `?debug`
  - 3) nastavit `debugEnabled` na `true` při inicializaci enginu

<div className={styles.figure}>
  <img src={useBaseUrl('img/docs/pixi-ecs/debug_window.jpg')} />
</div>
