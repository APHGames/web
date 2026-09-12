export type VideoItem = {
	id: string;
	title: string;
	description: string;
	duration: number;
};

export type VideoSection = {
	id: string;
	title: string;
	intro: string;
	videos: VideoItem[];
};

export const formatVideoDuration = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const rest = seconds % 60;
	if (hours > 0) {
		return `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
	}
	return `${minutes}:${String(rest).padStart(2, '0')}`;
};

export const videoSections: VideoSection[] = [
	{
		id: 'prednasky',
		title: 'Streamované přednášky',
		intro: 'Záznamy přednášek z kurzu APH, hostovských talků, herních rozborů a prezentací studentských prací.',
		videos: [
			{
				id: 'GOlffijtqG0',
				title: 'APH Kurz — Úvodní informace',
				description: 'Organizace předmětu, očekávání, semestrální práce a jak s materiály APHGames pracovat.',
				duration: 2048,
			},
			{
				id: '0SB6mQRJH98',
				title: 'APH Přednáška č. 1: Svět her',
				description: 'Úvod do herního média — žánry, platformy, industriální kontext a co z toho plyne pro vývojáře.',
				duration: 5333,
			},
			{
				id: 'nDBEGN64tkI',
				title: 'APH Přednáška č. 2: Enginy',
				description: 'Jak jsou postavené herní enginy, co řeší runtime a kde končí „engine“ a začíná hra.',
				duration: 4220,
			},
			{
				id: 'OobTtUNHiUg',
				title: 'APH Přednáška č. 3: Assety',
				description: 'Práce s grafikou, zvukem a daty: pipeline, formáty, import a jak assety ovlivňují architekturu hry.',
				duration: 4749,
			},
			{
				id: 'b8ix0PzR50c',
				title: 'APH Přednáška č. 4: Komponenty',
				description: 'Komponentově orientovaný návrh, ECS a proč se hry neskládají z hlubokých dědičných stromů.',
				duration: 5469,
			},
			{
				id: 'D8v0qLIK1DA',
				title: 'APH Přednáška č. 5: Patterny a postupy',
				description: 'Herní programovací vzory — od object poolu po messaging — a kdy který dává smysl.',
				duration: 4809,
			},
			{
				id: 'Bf0uErDDzkM',
				title: 'APH Přednáška č. 6: Prostor',
				description: 'Reprezentace herního světa, kamery, dlaždice, grafy a jak se v prostoru hledá cesta.',
				duration: 5279,
			},
			{
				id: 'Z-LFcw-X4tU',
				title: 'APH Přednáška č. 7: Fyzika',
				description: 'Kolize, rigid body, integrace a praktické kompromisy herní fyziky vůči „pravé“ simulaci.',
				duration: 5535,
			},
			{
				id: 'CxgBzCw9tFA',
				title: 'APH Přednáška č. 8: Hudba',
				description: 'Zvuk a hudba ve hrách: vrstvy, adaptive audio, nástroje a jak audio drží atmosféru pohromadě.',
				duration: 4798,
			},
			{
				id: 'c9-ru3v0LUo',
				title: 'APH Přednáška č. 9: Grafika',
				description: 'Renderovací pipeline, shadery, 2D/3D specifika a co vývojář hry opravdu potřebuje vědět o grafice.',
				duration: 5063,
			},
			{
				id: 'nqMr_EYGDqc',
				title: 'APH Přednáška č. 10: Herní AI',
				description: 'Chování agentů, stavové stroje, steering, pathfinding a jak AI ve hrách klame hráče k zábavě.',
				duration: 5122,
			},
			{
				id: 'B3IdpjjZ91E',
				title: 'APH Přednáška č. 11: Multiplayer',
				description: 'Sítě ve hrách: autorita, latence, predikce, lockstep versus klient-server.',
				duration: 5054,
			},
			{
				id: 'sOWoBszLZAM',
				title: 'APH Přednáška č. 12: Herní design',
				description: 'Závěrečná přednáška o designu: mechaniky, smyčky, balanc a jak se z prototypu stane hra.',
				duration: 5161,
			},
			{
				id: 'MTfJ-g8jG-8',
				title: 'Gamifikace v komerčním prostředí (PRR)',
				description: 'Hostovská přednáška o tom, jak herní principy fungují mimo hry — v produktech, službách a firmách.',
				duration: 5026,
			},
			{
				id: '6_3XskQMSI4',
				title: 'Lecture 12/2021 (Design): Adam Vesecký & Mehmet Ekmekci',
				description: 'Společná přednáška o herním designu z ročníku 2021, s pohledem z výuky i z praxe.',
				duration: 4781,
			},
			{
				id: 'WYRbbs5tbOE',
				title: 'Arthas — Archetyp hrdiny',
				description: 'Rozbor Arthase z Warcraftu jako archetypu hrdiny: pád, motivace a vyprávěcí konstrukce.',
				duration: 1219,
			},
			{
				id: 'biBGdm5nt2A',
				title: 'Dune 1 — rozbor úplně první Dune hry',
				description: 'Návrat k první adaptaci Duny: hybrid adventury a strategie a co z ní zbylo v pozdějších hrách.',
				duration: 788,
			},
			{
				id: 'EDSPOd3Zv78',
				title: 'Doom Eternal — rozbor hry',
				description: 'Dlouhý rozbor Eternalu: combat puzzle, prostor, tempo a jak sequel tlačí DOOM formuli dál.',
				duration: 5908,
			},
			{
				id: 'HLJ_XSjvkA0',
				title: 'DOOM — rozbor hry',
				description: 'Klasický DOOM jako učebnice level designu, enginu a střelecké hratelnosti.',
				duration: 2653,
			},
			{
				id: 'aeiuQfNBK10',
				title: 'Prince of Persia — rozbor hry',
				description: 'Původní Prince of Persia: animace, timing, platforming a proč je pořád referenční hrou.',
				duration: 2371,
			},
			{
				id: 'mzlx7FSH-Lg',
				title: 'Počítač Commodore 64',
				description: 'Povídání o C64 — hardwaru, demoscéně a hrách, které na osmibitu vznikly.',
				duration: 1484,
			},
			{
				id: 'eZrt9u3K05c',
				title: 'Halloweenský speciál: 10 ikonických hororových her',
				description: 'Deset hororů, které definovaly žánr — od atmosféry po mechaniky strachu.',
				duration: 632,
			},
			{
				id: 'KFuPJ86vetE',
				title: 'SSUD Brno — rozbor středoškolských her',
				description: 'Přehlídka a rozbor her, které vznikly na Střední škole umění a designu v Brně.',
				duration: 2057,
			},
			{
				id: 'czSMimcZuAY',
				title: 'Herní bakalářky a diplomky z FIT ČVUT, 2024',
				description: 'Přehled závěrečných herních prací z FIT ČVUT za rok 2024.',
				duration: 902,
			},
			{
				id: 'kjzozWrCPKM',
				title: 'FEL ČVUT: semestrální projekty předmětu Počítačové hry, ZS 2023',
				description: 'Záznam prezentací semestrálek z předmětu Počítačové hry na FEL ČVUT.',
				duration: 914,
			},
			{
				id: '1rhDcHF5_DE',
				title: 'APH: semestrální práce, ZS 2023',
				description: 'Přehlídka semestrálních her z posledního běhu předmětu APH na FIT ČVUT.',
				duration: 732,
			},
			{
				id: 'opWzHWZo698',
				title: 'Semestrální práce z NI-VHS (Virtuální herní světy)',
				description: 'Ukázky studentských projektů z předmětu Virtuální herní světy.',
				duration: 462,
			},
			{
				id: 'cr7G7sNUhuw',
				title: 'Semestrální práce 2021',
				description: 'Sestřih semestrálních her z ročníku APH 2021.',
				duration: 452,
			},
			{
				id: 'ckjj8qlf7lg',
				title: 'Semestrální práce 2020',
				description: 'Sestřih semestrálních her z ročníku APH 2020.',
				duration: 487,
			},
			{
				id: 'bV9ojWycxu0',
				title: 'Přednáška ZS2020/01 — Games',
				description: 'První přednáška zimního semestru 2020: úvod do světa počítačových her.',
				duration: 5914,
			},
			{
				id: 'Y9RcEzftR5E',
				title: 'Přednáška ZS2020/02 — Engines',
				description: 'Záznam z roku 2020 o herních enginech a jejich architektuře.',
				duration: 7496,
			},
			{
				id: 'pvg3ZKqnWtY',
				title: 'Přednáška ZS2020/03 — Assets',
				description: 'Záznam z roku 2020 o herních assetech a produkční pipeline.',
				duration: 6110,
			},
			{
				id: 'Mqi5BQWlpXs',
				title: 'Přednáška ZS2020/04 — Components',
				description: 'Záznam z roku 2020 o komponentách a skládání herních objektů.',
				duration: 6626,
			},
			{
				id: 'PRPMA2yS5i8',
				title: 'Přednáška ZS2020/05 — Patterns',
				description: 'Záznam z roku 2020 o programovacích vzorech používaných ve hrách.',
				duration: 6678,
			},
			{
				id: 'P8e5doytDKM',
				title: 'Přednáška ZS2020/06 — Audio',
				description: 'Záznam z roku 2020 o herním zvuku a hudbě.',
				duration: 7186,
			},
			{
				id: 'TpoHrLT7_J4',
				title: 'Přednáška ZS2020/07 — Space',
				description: 'Záznam z roku 2020 o reprezentaci prostoru a navigaci ve hrách.',
				duration: 8244,
			},
			{
				id: 'm-c4rPlacuw',
				title: 'Přednáška ZS2020/08 — Physics',
				description: 'Záznam z roku 2020 o herní fyzice a kolizích.',
				duration: 6296,
			},
			{
				id: 'EKS_cOdqRRg',
				title: 'Přednáška ZS2020/09 — Graphics',
				description: 'Záznam z roku 2020 o grafice a vykreslování.',
				duration: 5538,
			},
			{
				id: 'yAT8GcFi6p0',
				title: 'Přednáška ZS2020/10 — Game AI',
				description: 'Záznam z roku 2020 o umělé inteligenci ve hrách.',
				duration: 6200,
			},
			{
				id: 'IVUZS9-mY0A',
				title: 'Přednáška ZS2020/11 — Multiplayer',
				description: 'Záznam z roku 2020 o multiplayeru a síťové synchronizaci.',
				duration: 7080,
			},
			{
				id: 'kT5xouVnhh8',
				title: 'Přednáška ZS2020/12 — Design',
				description: 'Závěrečná přednáška zimního semestru 2020 o herním designu.',
				duration: 5518,
			},
		],
	},
	{
		id: 'priklady',
		title: 'Příklady a tutoriály',
		intro: 'Praktické streamy k příkladům z APHGames: od TypeScriptu a PixiJS až po konkrétní minihry, fyziku, GIT a Godot.',
		videos: [
			{
				id: 'oMy7a6y8B4U',
				title: 'Tutoriál: Úvod do prostředí',
				description: 'Jak si nachystat vývojové prostředí, repo s příklady a první spuštění dema.',
				duration: 1082,
			},
			{
				id: 'Yz2P1Iopf2k',
				title: 'Tutoriál: TypeScript',
				description: 'Základy TypeScriptu tak, jak je potřebujeme u příkladů APHGames.',
				duration: 2453,
			},
			{
				id: 'uTIp4Gh0-T8',
				title: 'Tutoriál: Úvod do PIXI',
				description: 'První kroky v PixiJS — stage, sprite, ticker a jak se knihovna váže na naše dema.',
				duration: 2108,
			},
			{
				id: 'mgngYvNV3zo',
				title: 'Tutoriál: Pozicování v PIXI',
				description: 'Souřadnice, kotvy, kontejnery a jak v PixiJS skládat objekty do scény.',
				duration: 979,
			},
			{
				id: 'Yab5GZL7oI8',
				title: 'Tutoriál: Herní smyčka v PIXI',
				description: 'Update/render smyčka, delta time a kde v kódu žije „srdce“ minihry.',
				duration: 457,
			},
			{
				id: 'MUS5aeklKqk',
				title: 'Tutoriál: PIXI Sprite Animace',
				description: 'Animace spritů, spritesheety a přepínání snímků v PixiJS.',
				duration: 1356,
			},
			{
				id: 'rujC2lXgrFk',
				title: 'Tutoriál: Bitmapový text v PIXI',
				description: 'Jak v PixiJS kreslit bitmapové písmo a použít ho v UI minihry.',
				duration: 494,
			},
			{
				id: 'JoYRi1crZMU',
				title: 'Tutoriál: Shadery v PIXI',
				description: 'Jednoduché shadery nad PixiJS — filtry, uniformy a vizuální efekty ve 2D.',
				duration: 1625,
			},
			{
				id: 'i1aKqch9VSM',
				title: 'Tutoriál: PIXI-ECS a komponenty',
				description: 'Propojení PixiJS s komponentovým (ECS) přístupem, ze kterého později vyšlo COLF.io.',
				duration: 1014,
			},
			{
				id: 'YS9uJJgT7V0',
				title: 'Tutoriál: Komponenty — příklady',
				description: 'Konkrétní komponenty v praxi: pohyb, vstup, kolize a jak se skládají do entity.',
				duration: 2615,
			},
			{
				id: 'X9i1KHiILhE',
				title: 'Tutoriál: Block Breaker 1/5',
				description: 'Začátek klonu Arkanoidu: plocha, pálka, míček a základní pohyb.',
				duration: 1402,
			},
			{
				id: 'PHHjj_bQFMs',
				title: 'Tutoriál: Block Breaker 2/5',
				description: 'Cihličky, odrazy a první hratelný level Breakeru.',
				duration: 1300,
			},
			{
				id: 'Rkb0jTRDFEk',
				title: 'Tutoriál: Block Breaker 3/5',
				description: 'Rozšíření Breakeru o herní stavy, skóre a další cihlové typy.',
				duration: 1531,
			},
			{
				id: 'iFwvotGsOuA',
				title: 'Tutoriál: Block Breaker 4/5',
				description: 'Power-upy, obtížnost a doladění pocitu z ovládání.',
				duration: 1661,
			},
			{
				id: '689lxc8eJEQ',
				title: 'Tutoriál: Block Breaker 5/5',
				description: 'Dokončení minihry: úrovně, win/lose stavy a úklid kódu.',
				duration: 1817,
			},
			{
				id: '9RgozrXlu8c',
				title: 'Tutoriál: Fyzika a MatterJS',
				description: 'Napojení Matter.js na scénu — tělesa, kolize a herní fyzika ve 2D.',
				duration: 1605,
			},
			{
				id: 'gEXHZ6OIPfM',
				title: 'Tutoriál: Fyzikální animace látky',
				description: 'Simulace látky a měkkého tělesa jako vizuální efekt v příkladu.',
				duration: 2086,
			},
			{
				id: 'fL5rRLnAB6k',
				title: 'Tutoriál: Řádkovací dialog',
				description: 'Jak postavit textový dialog s postupným vypisováním řádků, typického pro adventury a RPG.',
				duration: 3438,
			},
			{
				id: 'iclLQU-pxyE',
				title: 'Tutoriál: Úvod do ThreeJS',
				description: 'První 3D scéna v Three.js — kamera, světla, meshe a rozdíl oproti PixiJS.',
				duration: 1016,
			},
			{
				id: '4ZcF5LkPFAQ',
				title: 'Tutoriál: Vlak',
				description: 'Rozbor klonu hry Vlak: pohyb po mřížce, sběr vagonů a herní logika.',
				duration: 1350,
			},
			{
				id: '6cWH0SXFmjo',
				title: 'Tutoriál: Tetris',
				description: 'Jak je v příkladech postavený Tetris: grid, rotace, clearing řádků a input.',
				duration: 1264,
			},
			{
				id: '5yRVJA04Xs8',
				title: 'Tutoriál: Základy GITu',
				description: 'GIT od nuly: repo, commity, větve a workflow, který stačí na semestrálku.',
				duration: 3849,
			},
			{
				id: 'kjtTp6E-pjk',
				title: 'Tutoriál: Pokročilý GIT',
				description: 'Rebase, konflikty, historie a praktické triky, až základní GIT přestane stačit.',
				duration: 2984,
			},
			{
				id: 'x_CCWIZKpPQ',
				title: 'Tutoriál: Progress bar',
				description: 'UI prvek progress baru — vykreslení, animace a napojení na herní stav.',
				duration: 1867,
			},
			{
				id: '13Yt7seOsjo',
				title: 'Tutoriál: Dynamika zatáčení autíčka',
				description: 'Ackermannova geometrie a zatáčení vozidla, tak jak je v slidech a příkladu autíčka.',
				duration: 2464,
			},
			{
				id: 'xnSc5GD_Riw',
				title: 'Tutoriál: Platformer',
				description: 'Dlouhý stream k platformer příkladu: pohyb, skok, kolize a pocit z ovládání.',
				duration: 5592,
			},
			{
				id: 'GjfBWGCeSfg',
				title: 'Tutoriál: Godot Engine s Honzou Matouškem',
				description: 'Hostovský tutoriál Godotu — scény, nody a jak v něm rychle postavit hru.',
				duration: 5139,
			},
			{
				id: '9fZ9Usm4X8A',
				title: 'Honza & Marek — postřehy z vývoje hry Mirror Inca',
				description: 'Autoři Mirror Inca o tom, jak se indie hra ve skutečnosti vyrábí, šije a dodělává.',
				duration: 4584,
			},
		],
	},
	{
		id: 'serial',
		title: 'Jak se holky dostaly k počítačovým hrám',
		intro: 'Pětidílný seriál o historii hráček v Česku — od osmibitů přes herny a časopisy až k prahu herního průmyslu.',
		videos: [
			{
				id: '6pMaU4t3yGA',
				title: '1/5: Úsvit první generace',
				description: 'První hráčky osmdesátých let, kroužky, osmibity a jak se k počítačům vůbec dostaly.',
				duration: 791,
			},
			{
				id: 'yOdgohCbrSA',
				title: '2/5: Na prahu milénia',
				description: 'Devadesátky: herny, časopisy, LAN party a přelom století, kdy se z hobby stala scéna.',
				duration: 1003,
			},
			{
				id: '5gLVLYgbZ0Q',
				title: '3/5: Kultura gamerů',
				description: 'Komunita, fóra, stereotypy a to, jak se „gamer“ identita v Česku formovala.',
				duration: 1199,
			},
			{
				id: 'vvfr8tJ0EmE',
				title: '4/5: Od recenzí k turnajům',
				description: 'Ženy jako recenzentky, organizátorky a hráčky turnajů — od psaní k esports.',
				duration: 1199,
			},
			{
				id: 'HDOhUewoma4',
				title: '5/5: Před branami průmyslu',
				description: 'Vstup do vývoje her, studia a otázka, co z té historie zbývá v dnešním průmyslu.',
				duration: 1317,
			},
		],
	},
	{
		id: 'art',
		title: 'Art videa',
		intro: 'Krátké autorské snímky, intra, outro, PF, demoscéna a další vizuální experimenty kanálu.',
		videos: [
			{
				id: 'wIeAPpKRxGA',
				title: 'APHGAMES ukončuje spolupráci s FIT ČVUT',
				description: 'Krátké oznámení o konci spolupráce s FIT ČVUT a uzavření této kapitoly projektu.',
				duration: 146,
			},
			{
				id: '31VmorEYLB4',
				title: 'PF 2023',
				description: 'Novoroční PF video 2023 — sestřih, nálada a vizuální pozdrav z dílny APHGames.',
				duration: 210,
			},
			{
				id: 'TBdL_S1SyFc',
				title: 'Zajímavosti z natáčení PF videa',
				description: 'Behind the scenes k PF 2023: jak se točilo, skládalo a kde vznikaly gagy.',
				duration: 1434,
			},
			{
				id: 'CZ10u3NJ_wQ',
				title: 'Demoscene',
				description: 'Miniatura o demoscéně — realtime grafika, size-coding a kultura demoparty.',
				duration: 135,
			},
			{
				id: 'pM2r3vpU6Ec',
				title: 'Herní hudba',
				description: 'Krátké video o herní hudbě a tom, jak soundtrack drží hru pohromadě.',
				duration: 132,
			},
			{
				id: 'NBrRBiGoUbg',
				title: 'Solo indie developeři',
				description: 'Sestřih o sólových indie vývojářích a specifické samotě i svobodě téhle práce.',
				duration: 123,
			},
			{
				id: 'HsqyrAuaTYE',
				title: 'APHGames Reboot, začíná nová éra',
				description: 'Ohlašovací klip k rebootu značky a nové vlně materiálů.',
				duration: 87,
			},
			{
				id: 'OUhw-bYiSLQ',
				title: 'Intro pro 6. ročník předmětu APH',
				description: 'Úvodní video k šestému běhu předmětu APH.',
				duration: 77,
			},
			{
				id: 'QYO0SltCMxw',
				title: 'APHGames Intro 2021',
				description: 'Znělka kanálu z roku 2021.',
				duration: 106,
			},
			{
				id: 'wCTUqOHQzjk',
				title: 'APH Games Outro 2021',
				description: 'Závěrečná znělka a vizuální tečka ročníku 2021.',
				duration: 199,
			},
			{
				id: 'Wou_xwBIkvQ',
				title: 'APH Games Intro 2020',
				description: 'První znělka kanálu z roku 2020.',
				duration: 44,
			},
			{
				id: 'WjsCIwc9SnM',
				title: 'History of Video Games in 90 seconds',
				description: 'Dějiny videoher zhustěné do jedné a půl minuty — novější sestřih.',
				duration: 99,
			},
			{
				id: 'KsDHoNQFDHM',
				title: 'History of videogames in 90 seconds',
				description: 'Starší verze minutového sestřihu herní historie.',
				duration: 92,
			},
			{
				id: 'bRy5RcDxRwM',
				title: 'Warcraft — fan made trailer',
				description: 'Fanouškovský trailer ve warcraftovském duchu.',
				duration: 115,
			},
			{
				id: '4VZon_rTfOc',
				title: 'BlipBlops: Za hranicemi DOOM mapy',
				description: 'Krátký experiment: co se stane, když vylezete za okraj DOOM mapy.',
				duration: 108,
			},
			{
				id: '-shFuTCH-ug',
				title: 'Playing Doom — Now and Then',
				description: 'Miniatura porovnávající DOOM „tehdy a teď“ v pár desítkách sekund.',
				duration: 32,
			},
			{
				id: 'IdcONZ2zPeU',
				title: 'Noc vědců v ggLabu',
				description: 'Krátký záznam z Noci vědců v ggLabu.',
				duration: 48,
			},
			{
				id: '1sB5DVNuvNE',
				title: 'Ten moment, kdy zjistíte, že vůbec nestreamujete',
				description: 'Devatenáctisekundový fail ze streamu. Stává se.',
				duration: 19,
			},
		],
	},
	{
		id: 'gamejam',
		title: 'GameJam a GameHack',
		intro: 'Sestřihy, rozbory her a záznamy z GameJamů a GameHacku — FIT, Brno, Matfyz i teaser k víkendu v laboratoři.',
		videos: [
			{
				id: 'X_C7kOgkS_M',
				title: 'Spring Game Jam @ Matfyz 2024 — rozbor her',
				description: 'Rozbor her ze jarního jamu na Matfyzu 2024: co týmy stihly a jak k tématu přistoupily.',
				duration: 2446,
			},
			{
				id: '9Ru4-AUyXJc',
				title: 'Brno Game Jam 2024 — rozbor her',
				description: 'Přehlídka a rozbor her z Brněnského Game Jamu 2024.',
				duration: 1163,
			},
			{
				id: 'LFEqsRd3JUo',
				title: 'Game Jam FIT 2024 — rozbor her',
				description: 'Rozbor her z Game Jamu na FIT 2024.',
				duration: 1233,
			},
			{
				id: 'L-1mnv9kgCo',
				title: 'GameHack — můj poslední Game Jam',
				description: 'Osobní záznam a ohlédnutí za GameHackem, posledním jamem v této podobě.',
				duration: 2222,
			},
			{
				id: 'N8r8i8l6Qo0',
				title: 'GameHack — zhodnocení',
				description: 'Shrnutí GameHacku FIT: jak víkend dopadl, co vzniklo a co z akce zbylo.',
				duration: 2272,
			},
			{
				id: 'wTB9ZT3xcOU',
				title: 'GameHack teaser (17. 11. – 19. 11.)',
				description: 'Krátká pozvánka na GameHack FIT, 17.–19. listopadu.',
				duration: 67,
			},
			{
				id: '3QxhGMEfHzE',
				title: 'GameJam FIT — jaro 2023',
				description: 'Sestřih velikonočního GameJamu FIT 2023.',
				duration: 1527,
			},
			{
				id: 'fQSts96TT9A',
				title: 'GameJam FIT 2022',
				description: 'Sestřih podzimního GameJamu FIT 2022.',
				duration: 955,
			},
		],
	},
];
