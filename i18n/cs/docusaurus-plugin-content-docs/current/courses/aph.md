---
title: APH kurz
description: Požadavky na absolvování NI-APH předmětu
exclude_en: true
---

import Lectures from '@site/docs/courses/aph_lectures.tsx'


## Požadavky na úspěšné absolvování předmětu:
1. odevzdat koncept herní mechaniky
2. odprezentovat progres
3. odevzdat semestrální práci
4. absolvovat ústní zkoušku
5. získat alespoň 50 bodů za celý semestr

## Lekce
<Lectures />

## Důležité Termíny
- 5.11. - finalizace zadání
- 21.11. a 28.11. - prezentace progresu
- 19.12. - poslední přednáška (minitest)
- 11.1. - deadline pro odevzdání semestrálek
- 18.2. - konec semestru (nutné do té doby získat všechny potřebné body)

## Bodování
- **semestrálka**: 60 bodů, nutné minimum 30
- **zkouška**: 30 bodů, nutné minimum 15
- **minitest**: 10 bodů (ABCD odpovědi), není nutné minimum a není ani nutná účast
- kvíz: max 10 bodů (2 body za první 3 místa, jinak 1 bod)
  - kvíz se bude pořádat náhodně během přednášek
  - otázky budou z čehokoliv, co na minulých přednáškách padlo
- technický článek na blog - 10 bodů (v CZ, EN nebo obojí), nepovinné
- bonus, pokud semestrálka poběží na ggBlasteru - 10 bodů

### Odměny
- za 95 bodů a více - APH swag (tričko, hrníček,...)

### Penalizace
- **-5 bodů** - odevzdání zadání později než 5.11.
- **-20 bodů** - odevzdání semestrální práce později než 11.1.
- **-10 bodů** - neomluvená účast na prezentaci

## Semestrální projekt
### Požadavky
- hra musí běžet na webu
- na hře musí pracovat studenti sami nebo ve dvojicích
- námět hry musí být schválen cvičícím (v rámci fáze "Finalizace zadání")
- herní assety musí být z Public Domain (do ní spadají i assety generované AIčkem)
- hra musí obsahovat alespoň jednu netriviální **technickou** mechaniku
- hra může být využita s použitím herního enginu či grafické knihovny. Pro potřeby výuky vznikla knihovna [COLFIO](https://colf.io/)
- v případě využití knihovny COLFIO (či enginu s ECS architekturou), musí hra plně využívat ECS pattern (Entity-Component-System)

### Další požadavky
- hru vytvořte na fakultním [gitlabu](https://gitlab.fit.cvut.cz) s názvem `NI-APH`, aby byl dostupný přes `gitlab.fit.cvut.cz/<username>/NI-APH`
- repozitář by mimo samotné hry měl obsahovat:
  - README s krátkým popisem samotné hry a instrukcí k instalaci
  - diagram architektury (jako PNG/JPG obrázek)
  - **srozumitelné a pravidelné commity**
  - jméno autora v `package.json`, pokud použijete JavaScript/TypeScript, případně v jiném manifestovém souboru
  - jméno autora v licenčním souboru
- hra musí mít nějaký název který se zobrazí jak v HTML hlavičce tak v samotné hře
- repozitář by neměl obsahovat žádná redundantní data (především `node_modules`, `.unitypackage`, `Obj/`, `Temp/`) atd. Použijte `.gitignore` 

### Technická mechanika hry
- musí se jednat o mechaniku, která je netriviální z programátorského hlediska
- příklady
  - replay mechanika
  - hierarchický pathfinding
  - šplhání po laně
  - procedurálně generované objekty

### COLF.IO
- původně ECSLite a předtím APHLib
- [knihovna](https://colf.io), která vznikla pro potřeby studia a výuky komponentové architektury
- je to nadstavba grafické knihovny [PixiJS](https://pixijs.com/), ke které přidává komponentovou architekturu dle ECS patternu
- k dispozici je buďto jako externí npm balíček `colfio` nebo jako boilerplate projekt [ecs-template](https://github.com/APHGames/ecs-template)

### ggBlaster
- pokud hra poběží na **ggBlasteru**, je možné dostat až 10 bodů bonus
- aby semestrální práce běžela na arkádovém automatu `ggBlaster`, je potřeba, aby splnila následující požadavky:
  - hra se ovládá pouze klávesnicí namapovanou na tlačítka arkádovky
    - arkádovka obsahuje pro každého ze dvou hráčů joystick (4 pozice), 8 herních tlačítek a dvě funkční (např. menu/zpět)
  - hra je pro dva hráče
  - styl a žánr odpovídá arkádovému způsobu hraní (např. adventura se sem nehodí)
  - hra je optimalizovaná pro rozlišení 720x576 a 50 snímků za vteřinu
  - hra běží plynule na Raspberry 4 (přetaktované na 1800 MHz), platformou je prohlížeč Chromium

## Ústní zkouška
- nebude mít pevný termín, bude probíhat individuálně dle časových možností studentů v místnosti TH-A:1455 v lednu a v únoru
- předmětem bude diskuse nad různými tématy z přednášek (především těmi, které jsou ve slidech označeny oranžovou a červenou žárovičkou)

## Tabulka hodnocení
- dle klasifikační stupnice studijního a zkušebního řádu ČVUT

| Známka | Rozsah | Význam |
| ------ | ------ | ------ |
| A | 90+ | výborně |
| B | 80-89 | velmi dobře |
| C | 70-79 | dobře |
| D | 60-69 | uspokojivě |
| E | 50-59 | dostatečně |
| F | 0-49 | nedostatečně |