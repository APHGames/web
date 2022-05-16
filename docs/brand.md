---
title: Brand
description: NI-APH brand colors, fonts, and assets
---

import styles from '@site/src/css/docs.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

## Title
Originally, APH stood for "Architektura Počítačových Her" (Architecture of Computer Games), the original Czech name of the course at FIT CTU. In 2021, the whole brand has expanded above the university course, and the abbreviation itself had to be re-defined to follow English content. The brand was given the name "APH Games", in order to maintain the original abbreviation. Now, **APH Games** stands for "Architecture, Programming, and Hitboxes of Games".


## Visual language

The visual language of the NI-APH course has made a long way since 2017. 

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
        <span>APH 2021</span>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/aph_2022.png')} />
        <span>APH 2022+</span>
    </div>
</div>


In 2017, the design consisted of a simple logo made of **APH** letters and a striped effect over all images.
2018 brought several changes to the design - slides were readjusted from 4:3 to 16:9 ratio, colors were carefully chosen and the striped effect was smoothened.
In 2019, all slides were rewritten from PowerPoint into HTML, which brought new opportunities - interactive content, CSS animations, and themes. The logo could benefit from a new look, 
yet it still contained letters from the Czech title "Architektura Počítačových Her", which wasn't very convenient for a symbol. Moreover, slides were wrapped in fancy colored frames and 
titles were animated with a slight touch of chromatic aberration. Along with tech-like shiny backgrounds, the concept itself looked cool, but it couldn't do much justice the topic as a whole. Furthermore, these eye-candies found themselves distracting when one needed to study the content.

Ultimately, in 2020, a fully-fledged brand template was introduced - color palette, a logo that has a good ring to the course itself, and unique visuals, including a grid-like pattern for the slides, suggesting
graph paper for architectural sketches. All fancy animations from 2019 have receded in a blaze of simplicity and minimalism.

In 2021, some minor changes were introduced - slightly modified logo and better color selection for the diagrams.

In 2022, final touches were made and the black-and-white version was promoted as the main version of the logo.

## Logo

The APH logo is a graphic representation of the brand and the primary graphic element of its identity. The symbol is represented as a stylized microchip with joypad buttons on its surface - directional buttons on the left,
ABXY buttons on the right, rotated by 90 degrees counter-clockwise, and tiny start and select buttons in the middle. The yellow Y button is cut out from the left, at the angle of 90 degrees.

The logo represents the mission, purpose, and message of the **APH Games** brand.

<div className={styles.figure}>
        <img src={useBaseUrl('img/docs/brand/logo_measured.svg')} />
        <span>APH logo technical drawing</span>
</div>

<div className={styles.figure}>
        <img src={useBaseUrl('img/docs/brand/logo_colored.svg')} />
        <span>APH colored logo</span>
</div>


### Symbol

The symbol is represented by ABXY buttons that appear on the right side of the logo. It is a detachable part of the logo and can be used in specific cases, such as favicons.

<div className={styles.figurelistsm}>
    <div>
            <img src={useBaseUrl('img/docs/brand/logo_detached.svg')} />
            <span>APH symbol</span>
    </div>
    <div>
            <img src={useBaseUrl('img/docs/brand/logo_detached_white.svg')} />
            <span>APH symbol (black and white)</span>
    </div>
</div>


### Logo Variations

Buttons can have the same color as the joypad (yet the cut out one must be brighter than the rest), and the cover can be removed.
In case of a solid dark background, logo can be used without the cover. If the background has other distracting elements that could interfere with the readability of the logo, the default version should be used instead.

<div className={styles.figurelist}>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_colored.svg')} />
        <div>Default</div>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_blackwhite.svg')} />
        <div>Black and White</div>
    </div>
    <div>
        <img src={useBaseUrl('img/docs/brand/logo_nocover.svg')} />
        <div>Without cover</div>
    </div>
</div>



## Colors

The APH palette is bright and consists of several primary colors and multiple secondary colors that provide a variety of possibilities on how to design the content.

### Primary colors

- primary colors are **lemon yellow**, **emerald green**, **royal blue**, and **tomato red**
- these colors are to be used mainly for highlighting
- lemon yellow represents Pac-Man, the first game that introduced a character
- emerald green represents grass of first open worlds from Zelda and Pokémon séries
- royal blue is the color of sky from Super Mario
- tomato red represents lava from first platformers

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

### Secondary colors

- secondary colors extend the pallete by modest manhattan color, distinctive and brightful aqua color, and pleasant matte azure

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

### Light and dark shades

- every primary and secondary color has got their own light and dark variant

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


### Contrasting colors

- midnight should only be used for backgrounds
- white color is a text color for labels. The default text color is Rhino 20

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


### Shades of Grey

- shades of Rhino color are used to differentiate between layouts and shapes

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

### Gradients

- gradients are not to be used lightly. In exceptional cases, they can jazz up the look-and-feel of some diagrams.

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

## Typography

Typography is crucial for the content. It must be simple, sleek and easy to read, as the content is intended mainly for education.

### Serif font

The primary font is **Source Sans Pro**. This font is used for written content, as well as some diagrams. Its light version slightly resembles OCR-B font, developed in 1968 for technical documentation.

<img src={useBaseUrl('img/docs/brand/font_sourcesans.svg')} />

### Monospace Font

Monospace font is **Inconsolata** and should only be used in code snippets and inside diagrams, in cases where serif font seems to be inappropriate.

<img src={useBaseUrl('img/docs/brand/font_inconsolata.svg')} />

### IBM VGA Font

PxPlus IBM VGA8 is an old bitmap font for IBM PC. Despite its very good readability, it's only intended for special cases, such as quotes and ancient code snippets where 
it can differentiate the content from other examples.

<img src={useBaseUrl('img/docs/brand/font_ibm.svg')} />

## Diagrams

Diagrams combine UML components and sci-fi HUD elements. The preferred color is **royal**. Other colors should only be used to highlight respective parts.

<img src={useBaseUrl('img/docs/brand/diagrams.svg')} />

## Code Snippets

Source code is parsed by **prismJS**. Primary colors are **emerald**, **royal** and **tomato light**.

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

## Slides

All slides are wrapped in a round frame of a grid-like pattern, suggesting architectonical graph paper. 
The frame is semi-transparent and the background may be any picture that is relevant to the content.

<img src={useBaseUrl('img/docs/brand/slides.jpg')} />
