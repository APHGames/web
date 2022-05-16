---
title: Brand
description: APHGames barvy a fonty

---

import styles from '@site/src/css/docs.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

## Název
Původně, APH znamenal "Architektura Počítačových Her, což byl název předmětu na FIT ČVUT. V roce 2021 bylo potřeba brand rozšířit mimo fakultu i do soukromé sféry, přičemž pro zahraniční trh bylo potřeba najít nový význam zkratky. Brand byl tedy pojmenován jako "APHGames", kde APH zkratka znamená "Architecture, Powerups, and Hitboxes in Games". Pro předmět NI-APH je však stále platný původní název.

## Grafický manuál

Grafický manuál ušel od roku 2017, kdy byl předmět založen, dlouhou cestu.

<div className={styles.oldaph}>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2017.png')} />
        <span>APH 2017</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2018.png')} />
        <span>APH 2018</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2019.png')} />
        <span>APH 2019</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2020.png')} />
        <span>APH 2020</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2021.png')} />
        <span>APH 2021+</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2022.png')} />
        <span>APH 2022+</span>
    </div>
</div>

V roce 2017 se design skládal z jednoduchého **APH** loga a pruhového filtru pro obrázky.
V roce 2018 došlo k několika změnám - přednáškové slidy byly předělány z 4:3 do praktičtějšího 16:9 poměru a došlo ke změně barevné palety z výrazných akcentů na konzervativnější odstíny.
V roce 2019 došlo k přepsání všech slidů z PowerPointu do HTML, což přineslo mnoho výhod - interaktivní obsah, CSS animace a jednoduché stylování. Bylo předěláno i logo předmětu, nicméně stále se jednalo o nastylovanou zkratku "APH". Dále zde přibyly SVG animace pro ilustrace přednášek. Chromatická aberace sice působila spolu s ostatními efekty velmi netradičně, pro účely samostudia a pročítání slidů se ukázala jako nevhodná.
Konečně, v roce 2020 došlo ke kompletnímu rebrandingu - nová paleta barev, unikátní vizuály, nové logo a minimalistický design slidů.
V roce 2021 došlo k několika menším změnám - logo bylo mírně poupraveno a stejně tak některé barvy, nicméně se jednalo o drobné doladění předchozího rebrandingu.
V roce 2022 byly dovršeny finální úpravy, které představily černobílou variantu jako hlavní.

## Logo

APH logo je grafická reprezentace brandu APHGames a primární grafický prvek jeho identity. Symbol je reprezentován jako stylizovaný mikročip s tlačítky herního ovladače na povrchu - směrová tlačítka nalevo a ovládací tlačítka napravo. Levé ovládací tlačítko je vyříznuto pod úhlem 90 stupňů.

Celé logo představuje ucelenou reprezentaci mise a poslání **APH Games** brandu.

<div className={styles.figure}>
        <img src={useBaseUrl('img/docs/brand/logo_measured.svg')} />
        <span>APH logo - okótovaný nákres</span>
</div>

<div className={styles.figure}>
        <img src={useBaseUrl('img/docs/brand/logo_colored.svg')} />
        <span>APH logo v barvách</span>
</div>


### Symbol

Symbol je reprezentován ovládacími tlačítky z pravé části loga. Jedná se o odnímatelnou část a může být použito ve specifických případech.

<div className={styles.figurelistsm}>
    <div>
            <img src={useBaseUrl('img/docs/brand/logo_detached.svg')} />
            <span>APH symbol</span>
    </div>
    <div>
            <img src={useBaseUrl('img/docs/brand/logo_detached_white.svg')} />
            <span>APH symbol (černobílá)</span>
    </div>
</div>


### Varianty loga

Ovládací tlačítka můžou mít stejnou barvu jako tlačítka směrová, nicméně levé ovládací tlačítko musí být vždy akcentováno výraznějším odstínem. Obal mikročipu může být odstraněn, pokud budou ponechány piny na stranách.
V případě tmavého pozadí může být použito logo bez obalu mikročipu, pokud nebudou obtékající prvky či pozadí plochy, kde je logo umístěno, narušovat jeho čitelnost.

<div className={styles.figurelist}>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_colored.svg')} />
        <div>Standardní</div>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_blackwhite.svg')} />
        <div>Černobílé</div>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_nocover.svg')} />
        <div>Bez obalu</div>
    </div>
</div>



## Barvy

APH paleta je světlá a obsahuje několik primárních barev a mnoho sekundárních barev, které poskytují dostatečnou variabilitu k designování obsahu.

### Primární barvy

- primární barvy jsou **lemon yellow**, **emerald green**, **royal blue**, a **tomato red**
- tyto barvy by se měly používat především pro akcentaci
- lemon yellow reprezentuje Pac-Mana, první hru s herní postavou
- emerald green reprezentuje vegetaci prvních open-world her ze série Zelda
- royal blue je barva oblohy ze série Super Mario
- tomato red reprezentuje lávu z prvních platformerů

<div className={styles.colors}>
    <div>
        <div className={clsx(styles["bgr-lemon"], styles["color-rhino-80"])}>#E9E56F</div>
        <span>Lemon</span>
    </div>
    <div>
        <div className={styles["bgr-emerald"]}>#47D58A</div>
        <span>Emerald</span>
    </div>
    <div>
        <div className={styles["bgr-royal"]}>#6F8CE9</div>
        <span>Royal</span>
    </div>
    <div>
        <div className={styles["bgr-tomato"]}>#CF2F25</div>
        <span>Tomato</span>
    </div>
</div>

### Sekundární barvy

- sekundární barvy rozšiřují paletu o konzervativní manhattan barvu, svěží aqua barvu a komfortní matte azure

<div className={clsx(styles.colors, styles.smaller)}>
    <div>
        <div className={clsx(styles["bgr-manhattan"], styles["color-rhino-80"])}>#F6C9A0</div>
        <span>Manhattan</span>
    </div>
    <div>
        <div className={styles["bgr-aqua"]}>#6F8CE9</div>
        <span>Aqua</span>
    </div>
    <div>
        <div className={styles["bgr-azure"]}>#2C57DF</div>
        <span>Azure</span>
    </div>
</div>

### Světlé a tmavé odstíny

- každá primární a sekundární barva má svou světou a tmavou variantu

<div className={clsx(styles.colors, styles.smaller)}>
    <div>
        <div className={clsx(styles["bgr-tomato-light"], styles["color-rhino-90"])}>#FF867F</div>
        <span>Tomato Light</span>
    </div>
    <div>
        <div className={styles["bgr-tomato"]}>#CF2F25</div>
        <span>Tomato</span>
    </div>
    <div>
        <div className={styles["bgr-tomato-dark"]}>#7D0600</div>
        <span>Tomato Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-manhattan-light"], styles["color-rhino-90"])}>#FFF2E6</div>
        <span>Manhattan Light</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-manhattan"], styles["color-rhino-60"])}>#F6C9A0</div>
        <span>Manhattan</span>
    </div>
    <div>
        <div className={styles["bgr-manhattan-dark"]}>#A56B36</div>
        <span>Manhattan Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-goldenrod-light"], styles["color-rhino-90"])}>#FFD179</div>
        <span>Goldenrod Light</span>
    </div>
    <div>
        <div className={styles["bgr-goldenrod"]}>#FBB227</div>
        <span>Goldenrod</span>
    </div>
    <div>
        <div className={styles["bgr-goldenrod-dark"]}>#A96F00</div>
        <span>Goldenrod Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-lemon-light"], styles["color-rhino-90"])}>#FFFDC8</div>
        <span>Lemon Light</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-lemon"], styles["color-rhino-60"])}>#E9E56F</div>
        <span>Lemon</span>
    </div>
    <div>
        <div className={styles["bgr-lemon-dark"]}>#A19D22</div>
        <span>Lemon Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-emerald-light"], styles["color-rhino-90"])}>#A0F1C6</div>
        <span>Emerald Light</span>
    </div>
    <div>
        <div className={styles["bgr-emerald"]}>#47D58A</div>
        <span>Emerald</span>
    </div>
    <div>
        <div className={styles["bgr-emerald-dark"]}>#009244</div>
        <span>Emerald Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-aqua-light"], styles["color-rhino-90"])}>#86ECEC</div>
        <span>Aqua Light</span>
    </div>
    <div>
        <div className={styles["bgr-aqua"]}>#30D2D5</div>
        <span>Aqua</span>
    </div>
    <div>
        <div className={styles["bgr-aqua-dark"]}>#00A0A0</div>
        <span>Aqua Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-azure-light"], styles["color-rhino-90"])}>#7893EA</div>
        <span>Azure Light</span>
    </div>
    <div>
        <div className={styles["bgr-azure"]}>#2C57DF</div>
        <span>Azure</span>
    </div>
    <div>
        <div className={styles["bgr-azure-dark"]}>#0A2C9D</div>
        <span>Azure Dark</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-royal-light"], styles["color-rhino-90"])}>#C9D4FB</div>
        <span>Royal Light</span>
    </div>
    <div>
        <div className={styles["bgr-royal"]}>#6F8CE9</div>
        <span>Royal</span>
    </div>
    <div>
        <div className={styles["bgr-royal-dark"]}>#4D6FDC</div>
        <span>Royal Dark</span>
    </div>
</div>


### Kontrastní barvy

- midnight by se měla použít pouze pro pozadí
- bílá barva je barva textu pro nadpisy. Defaultní barva textu je **Rhino 20**

<div className={clsx(styles.colors)}>
    <div>
        <div className={styles["bgr-midnight-dark"]}>#03060C</div>
        <span>Midnight dark</span>
    </div>
    <div>
        <div className={styles["bgr-midnight"]}>#121824</div>
        <span>Midnight</span>
    </div>
    <div>
        <div className={styles["bgr-midnight-light"]}>#3A414E</div>
        <span>Midnight light</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-white"], styles["color-rhino-100"])}>#FFFFFF</div>
        <span>White</span>
    </div>
</div>


### Odstíny šedi

- odstíny barvy Rhino se použijí pro odlišení tvarů a vrstev

<div className={styles.colors}>
    <div>
        <div className={styles["bgr-rhino-100"]}>#1D232D</div>
        <span>Rhino-100</span>
    </div>
    <div>
        <div className={styles["bgr-rhino-90"]}>#2F3744</div>
        <span>Rhino-90</span>
    </div>
    <div>
        <div className={styles["bgr-rhino-80"]}>#535E70</div>
        <span>Rhino-80</span>
    </div>
    <div>
        <div className={styles["bgr-rhino-60"]}>#7B8694</div>
        <span>Rhino-60</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-rhino-40"], styles["color-rhino-80"])}>#A6AEB8</div>
        <span>Rhino-40</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-rhino-20"], styles["color-rhino-80"])}>#D2D6DC</div>
        <span>Rhino-20</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-rhino-10"], styles["color-rhino-60"])}>#E8EAEC</div>
        <span>Rhino-10</span>
    </div>
    <div>
        <div className={clsx(styles["bgr-rhino-5"], styles["color-rhino-60"])}>#F3F4F5</div>
        <span>Rhino-5</span>
    </div>
</div>

### Přechody

- přechody by se měly používat s rozvahou a jen ve výjimečných případech

<div className={clsx(styles.colors, styles.smaller, styles.gradients)}>
    <div>
        <div className={styles["bgr-gradient-rhino"]}>#A6AEB8 - #7B8694</div>
        <span>Rhino 40/60</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-rhino-45"]}>#A6AEB8 - #7B8694</div>
        <span>Rhino 40/60 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-rhino-90"]}>#A6AEB8 - #7B8694</div>
        <span>Rhino 40/60 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-rhino-dark"]}>#535E70 - #1D232D</div>
        <span>Rhino 80/100</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-rhino-dark-45"]}>#535E70 - #1D232D</div>
        <span>Rhino 80/100 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-rhino-dark-90"]}>#535E70 - #1D232D</div>
        <span>Rhino 80/100 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-tomato"]}>#CF2F25 - #7D0600</div>
        <span>Tomato</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-tomato-45"]}>#CF2F25 - #7D0600</div>
        <span>Tomato 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-tomato-90"]}>#CF2F25 - #7D0600</div>
        <span>Tomato 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-manhattan"]}>#F6C9A0 - #A56B36</div>
        <span>Manhattan</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-manhattan-45"]}>#F6C9A0 - #A56B36</div>
        <span>Manhattan 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-manhattan-90"]}>#F6C9A0 - #A56B36</div>
        <span>Manhattan 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-goldenrod"]}>#FBB227 - #A96F00</div>
        <span>Goldenrod</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-goldenrod-45"]}>#FBB227 - #A96F00</div>
        <span>Goldenrod 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-goldenrod-90"]}>#FBB227 - #A96F00</div>
        <span>Goldenrod 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-lemon"]}>#E9E56F - #A19D22</div>
        <span>Lemon</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-lemon-45"]}>#E9E56F - #A19D22</div>
        <span>Lemon 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-lemon-90"]}>#E9E56F - #A19D22</div>
        <span>Lemon 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-emerald"]}>#47D58A - #009244</div>
        <span>Emerald</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-emerald-45"]}>#47D58A - #009244</div>
        <span>Emerald 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-emerald-90"]}>#47D58A - #009244</div>
        <span>Emerald 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-aqua"]}>#30D2D5 - #00A0A0</div>
        <span>Aqua</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-aqua-45"]}>#30D2D5 - #00A0A0</div>
        <span>Aqua 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-aqua-90"]}>#30D2D5 - #00A0A0</div>
        <span>Aqua 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-azure"]}>#2C57DF - #0A2C9D</div>
        <span>Azure</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-azure-45"]}>#2C57DF - #0A2C9D</div>
        <span>Azure 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-azure-90"]}>#2C57DF - #0A2C9D</div>
        <span>Azure 90°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-royal"]}>#6F8CE9 - #4D6FDC</div>
        <span>Royal</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-royal-45"]}>#6F8CE9 - #4D6FDC</div>
        <span>Royal 45°</span>
    </div>
    <div>
        <div className={styles["bgr-gradient-royal-90"]}>#6F8CE9 - #4D6FDC</div>
        <span>Royal 90°</span>
    </div>
    
</div>

## Typografie

Typografie hraje významnou roli pro obsah. Musí být jednoduchá, elegantní a dobře čitelná, neb obsah je určen primárně pro vzdělávání.

### Patkový font

Primární font je **Source Sans Pro**, který je určen pro psaný obsah a některé diagramy. Jeho tenká varianta, která ne náhodou připomíná OCR-B font pro technickou dokumentaci (kolmé písmo typu B), akcentuje architektonické aspekty předmětu.

<img src={useBaseUrl('img/docs/brand/font_sourcesans.svg')} />

### Neproporcionální Font

Neproporcionálním fontem je **Inconsolata** a měl by se používat pouze pro ukázky kódu a uvnitř diagramů, kde se použití patkového fontu jeví jako nepříliš vhodné.

<img src={useBaseUrl('img/docs/brand/font_inconsolata.svg')} />

### IBM VGA Font

PxPlus IBM VGA8 je starý bitmapový font pro IBM PC. Je určen pro specifické případy (např. v případě potřeba akcentace retro-gamingu).

<img src={useBaseUrl('img/docs/brand/font_ibm.svg')} />

## Diagramy

Diagramy v sobě kombinují UML principy a design tzv. FakeUI používané v kinematografii. Preferovanou barvou je **royal**. Ostatní barvy by se měly použít pouze pro akcentaci.

<img src={useBaseUrl('img/docs/brand/diagrams.svg')} />

## Zdrojový Kód

Pro zdrojový kód jsou primární barvy **emerald**, **royal** a **tomato light**.

```javascript
function createIterator(array) {
    let currIdx = 0
    return {
        next() {
            return currIdx < array.lenth ? {
                value: array[currIdx++], done: false,
            } : { done: true }
        },
    }
}
```

## Slidy

Všechny slidy jsou umístěné v obdélníkovém rámci s mřížkovým vzorem, připomínajícím papír pro technické výkresy.
Celý rám je polo-průhledný a má zaoblené okraje.

<img src={useBaseUrl('img/docs/brand/slides.jpg')} />
