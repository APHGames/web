import { EventHomeData, FaqItem, RuleSection } from './types';

export const gamehackHome: EventHomeData = {
	kind: 'gamehack',
	title: 'GameHack FIT',
	heroTitle: 'GameHack',
	welcomeDate: 'Pátek 17.11. - Neděle 19.11. 2023',
	welcomeHtml: [
		'Dobrodruhu, ač samotný či s družinou, zveme Tě, aby ses připojil k našemu podzimnímu rituálu tvorby počítačových her. Dobře si rozpočti čas dvou slunečních cyklů, zužitkuj všechny nástroje, ve kterých najdeš zalíbení a zkrášli svůj výtvor svými koncepty, aby je mohl celý ansámbl obdivovat. Nechť právě Tvá kompozice bude legendou všech dimenzí.',
		'Zkušení průvodci Ti budou nablízku a poskytnou Tobě i Tvé družině cenné rady k vaší tvorbě.',
		'Konání této sešlosti se uskuteční v prostorách FIT ČVUT, jmenovitě na Thákurově 9 TH:A-1455 v Praze. Bude zde dostatek zábavy, různorodých jídel i místa pro odpočinek.',
		'Zapiš se do <a href="https://docs.google.com/forms/d/e/1FAIpQLSe3Ibul6fe5UUTwg0rBvLKUpH4GIHrG_OI_ochp5K83OG1YCw/viewform?usp=sf_link">registru účastníků</a>, dostav se na náš <a href="https://discord.gg/G5MbV8Ex77">Discord</a> a připrav se na zdolání nových výzev.',
	],
	sleepoverSrc: '/img/pages/events/gamehack/sleepover.png',
	programme: [
		{
			title: 'Pátek 17.11.',
			items: [
				{ time: '12:00', label: 'Otevření dveří' },
				{ time: '12:30', label: 'Úvodní slovo' },
				{ time: '13:30', label: 'Začátek programování', highlight: true },
				{ time: '17:00', label: 'Inspirační minitalky' },
				{ time: '20:00', label: 'Budova se zavírá' },
				{ time: '21:00', label: 'Lanparty v ggLabu' },
			],
		},
		{
			title: 'Sobota 18.11.',
			items: [
				{ time: '8:00', label: 'Budova se otevírá' },
				{ time: '12:00', label: 'Game Kvíz' },
				{ time: '15:30', label: 'Návštěva střechy budovy B' },
				{ time: '17:30+', label: 'Deskovky a lanparty v ggLabu' },
				{ time: '20:00', label: 'Budova se zavírá' },
			],
		},
		{
			title: 'Neděle 19.11.',
			items: [
				{ time: '8:00', label: 'Budova se otevírá' },
				{ time: '13:30', label: 'Konec programování', highlight: true },
				{ time: '14:00', label: 'Prezentace her' },
				{ time: '15:30', label: 'Filmový Kvíz' },
				{ time: '16:00', label: 'Vyhlášení cen' },
				{ time: '17:00', label: 'Volná zábava' },
			],
		},
	],
	organizers: [
		{ src: '/img/pages/events/gamehack/logo_fit.svg', alt: 'FIT ČVUT' },
		{ src: '/img/pages/events/gamehack/logo_aphgames.svg', alt: 'APHGames' },
		{ src: '/img/pages/events/gamehack/logo_cchaos.png', alt: 'CCHAOS' },
	],
	sponsors: [
		{ src: '/img/pages/events/gamehack/logo_scs.png', alt: 'SCS' },
		{ src: '/img/pages/events/gamehack/sponsors/partners_warhorse.png', alt: 'Warhorse' },
		{ src: '/img/pages/events/gamehack/cinemax.png', alt: 'Cinemax' },
		{ src: '/img/pages/events/gamehack/kodl.png', alt: 'Kodl' },
		{ src: '/img/pages/events/gamehack/sponsors/partners_visiongame.svg', alt: 'Visiongame' },
	],
	trailerYoutubeId: 'wTB9ZT3xcOU',
};

export const gamehackFaq: FaqItem[] = [
	{
		question: 'Jak se dostanu do budovy?',
		answer: 'Je potřeba projít přes atrium fakulty stavební (ne přes novou budovu architektury). Vchod je úplně na konci dlouhé ulice Technická. Ve vrátnici vás pustí přes turnikety a z atria se dejte doprava k výtahům a vyjeďte do 14. patra.',
	},
	{
		question: 'Je možné v budově přespat?',
		answer: 'Ano. Je ale potřeba mít na paměti, že budova se na noc uzavírá a zastřešuje, nebude ji tedy v nočních hodinách možné opustit ani se do ní vrátit. Ke spaní bude vyhrazeno jedno patro, k zapůjčení budou žíněnky. Těch je však omezený počet - konkrétní detaily budou diskutovány na Discordu.',
	},
	{
		question: 'Je možné použít assety, které jsme našli free v asset storu v Unity?',
		answer: 'Ano, pokud mají licenci Standard Unity Asset Store EULA.',
	},
	{
		question: 'Je možné použít assety, které jsem si zakoupil/a?',
		answer: 'Bohužel ne',
	},
	{
		question: 'Jaké enginy je možno při tvorbě použít?',
		answer: 'Jakékoliv, pokud budou splněny podmínky v pravidlech ohledně spuštění na platformě Windows.',
	},
	{
		question: 'Můžu hru z důvodu punkového nadšenectví vytvářet např. v DOSu či pro Commodore 64?',
		answer: 'Pokud je hra vytvářená pro platformu, která není kompatibilní s MS Windows, ale existuje pro ni zdarma dostupný a snadno instalovatelný emulátor, je možné zvolit i tento postup. Doporučili bychom ale takový případ konzultovat s organizátory.',
	},
	{
		question: 'Bude během akce i nějaké občerstvení?',
		answer: 'Ano, ale nebude se jednat o plnohodnotnou stravu, spíše jen o něco k zakousnutí. Občas se něco uvaří/upeče/usmaží, první den akce se obvykle objednává pizza.',
	},
	{
		question: 'Bude během akce k dispozici sprcha?',
		answer: 'Ano',
	},
	{
		question: 'Bude během akce k dispozici lednička?',
		answer: 'Ano, dokonce home-made',
	},
	{
		question: 'Budou během akce k dispozici monitory?',
		answer: 'Ano, doporučujeme ale vzít si s sebou převodník z DisplayPortu na HDMI, neb většina monitorů, které máme k dispozici, mají jen DP výstup.',
	},
];

export const gamehackRules: RuleSection[] = [
	{
		title: 'Pravidla pro účast',
		items: [
			{ html: 'GameHacku se může účastnit pouze osoba starší 18 let.' },
			{ html: 'Svou účastí účastník souhlasí s pořizováním a sdílením audiovizuálního materiálu pro PR účely, včetně pořizování záznamů z gameplaye či screenshotů her pro vystavení na veřejných kanálech fakulty a skupiny APHGames.' },
			{ html: 'Účastník se může zúčastnit buďto samostatně nebo jako tým. Tým může mít 1-6 členů.' },
			{ html: 'Je potřeba, aby alespoň jeden člen týmu byl prezenčně přítomen během pořádání akce, vyjma večerních hodin, kdy je budova ve zvláštním režimu.' },
			{ html: 'V budově fakulty je možné přespat, není to však explicitně vyžadováno.' },
			{ html: 'Pro hlavní komunikaci slouží <a href="https://discord.gg/G5MbV8Ex77">Discord.</a>' },
		],
	},
	{
		title: 'Pravidla pro vývoj',
		items: [
			{ html: 'Vytvářená hra musí být hratelná na consumer-grade PC s platformou Windows, případně jako webová hra spustitelná v prohlížeči Firefox nebo Chrome.' },
			{ html: 'Hra musí být vytvořena jen členy týmu, kteří se účastní akce.' },
			{ html: 'Vývoj hry musí probíhat pouze během stanovené doby. V případě pozdního odevzdání bude daný tým vyjmut z hodnocení porotou, bude však mít stále možnost prototyp hry odprezentovat.' },
			{ html: 'Programy třetích stran pro vývoj her a herních assetů je možno použít jen pokud má účastník licenci pro jejich použití.' },
			{ html: 'Je možno použít pouze ty assety, které jsou veřejně přístupné (tedy assety pod licencemi public domain, MIT, LGPL, CC, atp.) Není možné využít placené assety ani assety vytvořené účastníky před začátkem akce. Toto se týká i knihoven, které budou součástí výsledného buildu.' },
			{ html: 'Výsledná hra je autorským dílem týmu a Fakultě informačních technologií ČVUT nevznikají žádná autorská práva.' },
			{ html: 'Hra může být vydána v českém, slovenském nebo anglickém jazyce.' },
		],
	},
	{
		title: 'Pravidla pro odevzdávání',
		items: [
			{ html: 'Hra musí být odevzdaná na platformě <a href="https://itch.io">itch.io</a>. Odkaz na konkrétní stránku bude zveřejněn před začátkem akce.' },
			{ html: 'Autoři hry musí mít práva či licence na všechny části hry, aby splnili licenční podmínky pro veřejné vystavení.' },
			{ html: 'Hra musí být odevzdaná v termínu, který je vypsán v programu akce.' },
			{ html: 'Odevzdaná hra musí obsahovat binární soubory hry, několik vhodných screenshotů a krátký popis. Trailer či záznam z gameplaye je přáním, není však vyžadován.' },
		],
	},
	{
		title: 'Zadání',
		items: [
			{ html: 'Zadání budou tvořit tři témata a tři modifikátory, přičemž jeden od každého bude zveřejněn během týdne před začátkem akce.' },
			{ html: 'Autoři budou muset zapracovat dvě témata a dva modifikátory do svých her. Podrobnosti budou vysvětleny na našem <a href="https://discord.com/invite/qDZJ8QM4mz">Discordu</a>.' },
		],
	},
	{
		title: 'Pravidla pro hodnocení',
		items: [
			{
				html: 'Hodnocení proběhne celý následující týden až do úterý 28.11. na platformě itch.io. Na škále 1-5 budou hodnoceny následující aspekty:',
				children: [
					'Použití témat',
					'Použití modifikátorů',
					'Zábavnost',
					'Gameplay',
					'Originalita',
					'Smysl',
					'Grafika',
					'Hudba a zvuky',
				],
			},
			{ html: 'Hodnotit mohou jak účastníci akce, tak organizátoři.' },
			{ html: 'Celkový výsledek bude váženým součtem hodnocení všech aspektů.' },
			{ html: 'Organizátoři se zavazují, že ke každé hře napíšou alespoň jednu krátkou recenzi na platformě itch.io' },
		],
	},
	{
		title: 'Ceny',
		items: [
			{ html: 'Z organizačních důvodů budou ceny rozděleny již na konci akce (v neděli 19.11.) před začátkem online hlasování.' },
			{ html: 'Každý z organizátorů bude mít možnost zvolit vítěznou hru dle vlastních kritérií a autorskému týmu předá nějaké ceny.' },
			{ html: 'Drobné ceny jako steam kódy, brožurky, trička a plakáty budou následně předány k rozebrání všem účastníkům akce.' },
		],
	},
];
