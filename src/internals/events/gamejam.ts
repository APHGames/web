import { EventHomeData, FaqItem, RuleSection } from './types';

export const gamejamHome: EventHomeData = {
	kind: 'gamejam',
	title: 'GameJam FIT',
	heroTitle: 'GameJam',
	welcomeDate: 'Pátek 7.4. - Neděle 9.4. 2023',
	welcomeHtml: [
		'Příhodiči, ač samotný či s družinou, zveme Tvou slovutnost v těchto velikonočních dnech na sváření vynikající hry. Dobře si rozpočti čas, vynalézej s nástrojem Tebou znalým, přičti tři z čtyř povinných ingrediencí, dva dny pomíchej, ozdob nápady a vystav k obdivu. Nechť Tvůj recept bude tím vítězným.',
		'Rady zkušených kuchařů Ti stanou po boku a možnost obdržení cenné zpětné vazby od lidí z herního řemesla bude dána.',
		'Konání této čilosti uskutečněno bude v prostorách FIT ČVUT, jmenovitě na Thákurově 9 v Praze, s úvodním slovem předávaném v síni TH:A-1455, jež ggLab zove se. Zábavy bude hojně, i jídlo porůznu se zjeví.',
		'Ohlaš se v <a href="https://docs.google.com/forms/d/e/1FAIpQLSdOgCJJJAxckOgGXdcur9wF5P04AfuvP2Kym-Re9gnheS54Wg/viewform">účastnické listině</a>, dostav se na <a href="https://discord.com/invite/qDZJ8QM4mz">Discord</a> a těš se na činorodost.',
	],
	sleepoverSrc: '/img/pages/events/gamejam/sleepover.png',
	welcomeBackgroundSrc: '/img/pages/events/gamejam/photo.jpg',
	programme: [
		{
			title: 'Pátek 7.4.',
			items: [
				{ time: '12:00', label: 'Otevření dveří' },
				{ time: '12:30', label: 'Úvodní slovo' },
				{ time: '13:00', label: 'Začátek programování', highlight: true },
				{ time: '17:00', label: 'Představení týmů a slovo poroty' },
				{ time: '20:00', label: 'Budova se zavírá' },
			],
		},
		{
			title: 'Sobota 8.4.',
			items: [
				{ time: '8:00', label: 'Budova se otevírá' },
				{ time: '12:00', label: 'Game Quiz' },
				{ time: '17:30', label: 'Deskovky a jiná zábava' },
				{ time: '20:00', label: 'Budova se zavírá' },
				{ time: '0:00', label: 'Lanparty v SAGELabu' },
			],
		},
		{
			title: 'Neděle 9.4.',
			items: [
				{ time: '8:00', label: 'Budova se otevírá' },
				{ time: '13:00', label: 'Konec programování', highlight: true },
				{ time: '13:30', label: 'Prezentace her' },
				{ time: '16:00', label: 'Vyhlášení cen' },
				{ time: '17:00', label: 'Volná zábava' },
			],
		},
	],
	organizers: [
		{ src: '/img/pages/events/gamejam/logo_fit.svg', alt: 'FIT ČVUT' },
		{ src: '/img/pages/events/gamejam/logo_grafit.svg', alt: 'Grafit' },
		{ src: '/img/pages/events/gamejam/logo_aphgames.svg', alt: 'APHGames' },
		{ src: '/img/pages/events/gamejam/logo_sagelab.svg', alt: 'SAGELab' },
	],
	sponsors: [
		{ src: '/img/pages/events/gamejam/sponsors/partners_cesnet.png', alt: 'CESNET' },
		{ src: '/img/pages/events/gamejam/sponsors/partners_ipr.png', alt: 'IPR' },
		{ src: '/img/pages/events/gamejam/sponsors/partners_warhorse.png', alt: 'Warhorse' },
		{ src: '/img/pages/events/gamejam/sponsors/partners_zotac.png', alt: 'Zotac' },
		{ src: '/img/pages/events/gamejam/sponsors/partners_visiongame.svg', alt: 'Visiongame' },
	],
};

export const gamejamFaq: FaqItem[] = [
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
		answer: 'Jakékoliv, pokud budou splněny podmínky v pravidlech ohledně spuštění na cílové platformě. Pokud se rozhodnete použít Unreal engine, mějte na paměti, že s ním během GameJamu byla historicky řada problémů (kolaborace, build time,...)',
	},
	{
		question: 'Můžu hru z důvodu punkového nadšenectví vytvářet např. v DOSu či pro Commodore 64?',
		answer: 'Pokud je hra vytvářená pro platformu, která není kompatibilní s MS Windows, ale existuje pro ni zdarma dostupný a snadno instalovatelný emulátor, je možné zvolit i tento postup. Doporučili bychom ale takový případ konzultovat s porotou.',
	},
	{
		question: 'Je nutné využít všechny ingredience?',
		answer: 'Dle pravidel je nutné využít pouze 3 ze 4 ingrediencí. Způsob zakomponování je na vás, je však důležité umět si to před porotou během prezentace obhájit.',
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
		answer: 'Ano',
	},
	{
		question: 'Budou během akce k dispozici monitory?',
		answer: 'Ano, doporučujeme ale vzít si s sebou převodník z DisplayPortu na HDMI, neb většina monitorů, které máme k dispozici, mají jen DP výstup.',
	},
];

export const gamejamRules: RuleSection[] = [
	{
		title: 'Pravidla pro účast',
		items: [
			{ html: 'GameJamu se může účastnit pouze osoba starší 18ti let.' },
			{ html: 'Svou účastí účastník souhlasí s pořizováním a sdílením audiovizuálního materiálu pro PR účely, včetně pořizování záznamů z gameplaye či screenshotů her pro vystavení na veřejných kanálech fakulty a skupiny Grafit.' },
			{ html: 'Účastník se může zúčastnit buďto samostatně nebo jako tým. Tým může mít 1-6 členů.' },
			{ html: 'Je potřeba, aby alespoň jeden člen týmu byl prezenčně přítomen během pořádání akce, vyjma večerních hodin, kdy je budova ve zvláštním režimu.' },
			{ html: 'V budově fakulty je možné přespat, není to však explicitně vyžadováno.' },
			{ html: 'Pro hlavní komunikaci slouží <a href="https://discord.gg/qDZJ8QM4mz">Discord.</a>' },
		],
	},
	{
		title: 'Pravidla pro vývoj',
		items: [
			{ html: 'Vytvářená hra musí být hratelná na consumer-grade PC s platformou Windows, případně jako webová hra spustitelná v prohlížeči Firefox nebo Chrome.' },
			{ html: 'Hra musí být vytvořena jen členy týmu, kteří se účastní akce.' },
			{ html: 'Vývoj hry musí probíhat pouze během stanovené doby. V případě pozdního odevzdání bude daný tým vyjmut z hodnocení porotou, bude však mít stále možnost prototyp hry odprezentovat.' },
			{ html: 'Programy třetích stran pro vývoj her a herních assetů je možno použít jen pokud má účastník licenci pro jejich použití.' },
			{ html: 'Je možno použít pouze ty assety, které jsou veřejně přístupné (tedy assety pod licencemi public domain, MIT, LGPL, CC, atp.) Není možné využít placené assety ani assety vytvořené před začátkem akce. Toto se týká i knihoven.' },
			{ html: 'Výsledná hra je autorským dílem týmu a Fakultě informačních technologií ČVUT nevznikají žádná autorská práva.' },
		],
	},
	{
		title: 'Pravidla pro odevzdávání',
		items: [
			{ html: 'Hra musí být odevzdaná na platformě itch.io. Odkaz na konkrétní stránku bude zveřejněn před začátkem akce.' },
			{ html: 'Autoři hry musí mít práva či licence na všechny části hry, aby splnili licenční podmínky pro veřejné vystavení na platformě itch.io.' },
			{ html: 'Hra musí být odevzdaná v termínu, který je vypsán v programu akce.' },
			{ html: 'Odevzdaná hra musí obsahovat binární soubory hry, několik vhodných screenshotů a krátký popis. Trailer či záznam z gameplaye je vřele vítán.' },
		],
	},
	{
		title: 'Pravidla pro hodnocení',
		items: [
			{ html: 'Hra musí využívat alespoň 3 z celkových 4 ingrediencí, které budou oznámeny před začátkem akce.' },
			{
				html: 'Hodnocení bude probíhat zvolením 1-5 bodů každým porotcem v následujících kategoriích:',
				children: [
					'Využití ingrediencí',
					'Gameplay',
					'Zábavnost',
					'Audio',
					'Grafika',
					'Originalita',
				],
			},
			{ html: 'Hry budou hodnoceny pedagogy a lidmi z herní branže.' },
			{ html: 'Slovní zpětná vazba bude hrám distribuována ústně během akce a poté přes platformu itch.io' },
			{ html: 'Každá skupina (porotci z fakulty a zástupci jednotlivých herních společností) nominuje jeden vítězný tým.' },
		],
	},
];
