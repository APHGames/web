import { ArchiveRecap, ArchiveYear } from './types';

export const gamejamArchiveIntro = {
	paragraphs: [
		'Na půdě Fakulty informačních technologií proběhly již tři gamejamy pořádané výzkumnou skupinou Grafit ve spolupráci s APHGames a laboratořemi SAGELab a ggLab. Ty daly vzniknout zajímavému spektru her, od malých hříček přes ty hluboké, od arkádových klikačem po strategie. Jedním z hlavních cílů celé akce však není jen vyhrát, ale hlavně vytvořit hru, kterou bude možné vyslat do světa. Vytvořené hry byly zveřejněny na platformě itch.io a jsou připravené čelit ohodnocení a komentářům veřejnosti.',
	],
	ingredients: [
		'Na každém jamu dostanou účastníci sadu ingrediencí.',
		'Část z nich pak musí ve vytvořené hře použít.',
		'Neortodoxní, zajímavé a nečekané použití je přesně to, co hledáme.',
	],
	links: [
		{ href: 'https://drive.google.com/drive/folders/1-aVV-IfzPswrAmo6tzO_fSufTB4WgGfv', label: 'Fotografie z GameJamu 2020' },
		{ href: 'https://photos.google.com/share/AF1QipNYU6TTxZWClr2fcjKwNhVXlURpNkUXj7N7hh-eiwmdUTEh2H8_R8taaW1TV5FZFA?key=d193MHZyMXh0TDhPNVBOU2NDaVRocjlLWE1kWmZ3', label: 'Fotografie z GameJamu 2022.1' },
		{ href: 'https://drive.google.com/drive/u/1/folders/1H5SLt9WY01AoH9lZSSWHzB-Pi_uSNgG7', label: 'Fotografie z GameJamu 2022.2' },
		{ href: 'https://itch.io/jam/gamejam-fit-2022', label: 'Odevzdané hry z GameJamu 2022.1' },
		{ href: 'https://itch.io/jam/gamejam-fit-2022-2', label: 'Odevzdané hry z GameJamu 2022.2' },
	],
};

export const gamejamRecaps: ArchiveRecap[] = [
	{ title: 'Sestřih velikonočního GameJamu 2023', youtubeId: '3QxhGMEfHzE' },
	{ title: 'Sestřih podzimního GameJamu 2022', youtubeId: 'fQSts96TT9A' },
];

export const gamejamArchiveYears: ArchiveYear[] = [
	{
		id: '2022-2',
		title: 'GameJam podzim 2022',
		ingredientCount: 4,
		photoCount: 27,
		basePath: '/img/pages/events/gamejam/gallery/gj2022_2',
		games: [
			{
				team: 'Space Origin',
				author: '2 autoři',
				place: '1. místo',
				image: 'games/08.jpg',
				desc: 'Hra pro (ne)milovníky matematiky. Protivníkem jsou zde totiž funkce: sin, cos, a především ty nejzákeřnější - tan a cotg! A proč pro hráči funkce jdou? Inu, protože hráč je v systému této matematické dimenze [0, 0]!',
			},
			{
				team: 'Spirate',
				author: '5 autorů',
				place: 'nejlepší grafika',
				image: 'games/02.jpg',
				desc: 'Kooperační hra pro dva hráče střídajících se nejen v úkolu doslova sisyfovském, ale i v užívání jedné zbraně. A navíc v nádherném, barevně dokonale vyladěném, grafickém hávu.',
			},
			{
				team: 'Haunted House',
				author: '6 autorů',
				place: 'skvělý coop',
				image: 'games/03.jpg',
				desc: 'Atypická kooperační hra pro tři hráče - dva hráči (na jedné klávesnici) loví ducha a objevují tajemství strašidelného domu, zatímco třetí jim radí texty z mystické exorcistické knihy - prostě ideální párty hra!',
			},
			{
				team: 'Escape from Brno',
				author: '5 autorů',
				place: 'nejhumornější hra',
				image: 'games/06.jpg',
				desc: 'Co říci o této hře? Že je zábavná? Skvěle nakreslená? Dobře nadabovaná? Slovy autorů: "Útěk z Brna je dokumentární biografická hra o jednom Pražákovi a snaží se hráče seznámit s krutou realitou místa zvané Brno".',
			},
			{
				team: 'Rhune',
				author: '3 autoři',
				place: 'nejakustičtější hra',
				image: 'games/10.jpg',
				desc: 'Tato rytmicky založená hudební tower defense je kreativní spojení nečekaného. A funguje opravdu skvěle! A jednoduchý, čistý a líbivý design, a skvělý tutoriál, to jen podtrhují.',
			},
			{
				team: 'Binary Anomaly',
				author: '1 autor',
				place: '110011001010!',
				image: 'games/09.jpg',
				desc: 'Tato arkádovka sice oplývá jednoduchou a nedodělanou grafikou, ale zároveň skvělým nápadem - logický, hádankový coop hratelný i v jednom hráči sestavujícím binární zápis zadaného čísla.',
			},
			{
				team: 'Spirit of the Forest',
				author: '1 autor',
				place: 'skvělá atmosféra',
				image: 'games/04.jpg',
				desc: 'Jednoduchá hra jediného autora. Ač nedodělaná, genius loci mystického lesa ohroženého chřadnutím a korupcí z ní přímo dýchá.',
			},
			{
				team: 'Just a Ghost',
				author: '1 autor',
				place: 'největší progres',
				image: 'games/07.jpg',
				desc: 'Hříčka stvořená autorkou za jednoduchým účelem - naučit se Unreal Engine. A povedlo se. Stvořen byl hladový duch matematické dimenze, který zásadně požírá jen prvky se součtem nula.',
			},
			{
				team: 'Wrath of the Forest',
				author: '4 autoři',
				place: 'nejlepší strategie',
				image: 'games/05.jpg',
				desc: 'Tým FW je stálicí fitích gamejamů a vždy přijde s něčím překvapivým a inovativním. A tentokrát to byla tahová strategie! Dva duchová ve hře s nulovým součtem soupeří pomocí hord lišek, ptactva a medvědů o to, komu bude patřit les a jak bude vypadat.',
			},
			{
				team: 'Floor Zer0',
				author: '2 autoři',
				place: 'nejlepší runy',
				image: 'games/11.jpg',
				desc: 'Tato hra, která nejkreativněji používá mechaniku run. Ty zde totiž nenacházíte, ale vytváříte. A to pomocí numerické klávesnice. Zvládnete porazit všechny bosse a dostat se až na nulté podlaží?',
			},
			{
				team: 'Plague Snake',
				author: '3 autoři',
				place: 'skvělý lore',
				image: 'games/01.jpg',
				desc: 'Hra kombinuje skvělou grafiku Unreal Enginu a zajímavou craftící mechaniku lektvarů morového doktora. Zvládnete umíchat i ty nejsložitější lektvary?',
			},
		],
	},
	{
		id: '2022-1',
		title: 'GameJam jaro 2022',
		ingredientCount: 4,
		photoCount: 17,
		basePath: '/img/pages/events/gamejam/gallery/gj2022_1',
		games: [
			{
				team: '16000PSI',
				author: '4 autoři',
				place: '1. místo',
				image: 'games/01.jpg',
				desc: 'První skupina studentů se rozhodla vsadit na jistotu. Svérázná kombinace Subnauticy a Elden Ringu v kombinaci s dokončeností, rozhraním schopným si poradit i s 10K rozlišením a s podmanivou hudbou, vytvořila funkční mix, díky kterému si hra zasloužila první místo.',
			},
			{
				team: 'Eternal Effort',
				author: '2 autoři',
				place: 'nejlepší příběh',
				image: 'games/02.jpg',
				desc: 'Druhá skupina studentů se vrhla do tajemna a pokusila se z dodaných ingrediencí vytěžit maximum. Šedobílý svět věčné továrny utopený v mlze v kontrastu s maličkým človíčkem, údržbářem lamp, se stal esencí hned dvou ingrediencí, a tvoření baterií do lamp pak zastoupilo ingredienci třetí - strukturu. Až když ale hráč skutečně pochopil i tu poslední ingredienci, pochopil, že k úspěchu je někdy potřeba neúspěch...',
			},
			{
				team: 'Shructure',
				author: '3 autoři',
				place: 'nejmenší hrdina',
				image: 'games/04.jpg',
				desc: 'Názor poroty je jedna věc. Ale někdy ani post učitele her, ani práce ve Warhorse, ani nadšení pro gaming a hry všeho druhu nemusí zcela souznít s názory hráčů. Nebo - v tomto případě - účastníků gamejamu. V tomto ročníku jsme proto vyhlásili i vítěze, o kterém hlasovali právě ti, kteří zde hry tvořili. Cenu účastníků si vydobyl třetí tým se svojí kreativně pojmenovanou hrou, naznačující hlavní mechaniku hry - zmenšování sebe i nepřátel.',
			},
			{
				team: 'Shuffled Run',
				author: '2 autoři',
				place: 'nejhezčí grafika',
				image: 'games/05.jpg',
				desc: 'Hra čtvrtého týmu se sice neumístila na vítězných pozicích, ale i tak jde o hru zasluhující nemalou pozornost. A možná to byla i komplexita promyšlené mechaniky, která způsobila, že hra nefunguje úplně tak, jak by měla. Změna struktury levelu, hlavní mechanika jinak vizuálně uchvacující hry, je poněkud chaotická a nestabilní, ale stále originální a zajímavá.',
			},
			{
				team: 'Suez Run',
				author: '2 autoři',
				place: 'Ideál na mobil',
				image: 'games/03.jpg',
				desc: 'Ani hra pátého týmu neskončila před cílem a zdárně doplula do cíle. Meandry vývoje sice možná narovnaly původně klikatou řeku, passáty možná nejen že napnuly plachty, ale také trochu pomíchaly náhodné generování ker. I tak je ale Suez Run zajímavá hra. A co víc - skvěle vypadá i na obřím 10K rozlišení.',
			},
		],
	},
	{
		id: '2020',
		title: 'GameJam 2020',
		ingredientCount: 6,
		photoCount: 17,
		basePath: '/img/pages/events/gamejam/gallery/gj2020',
		games: [
			{
				team: 'Tým Godot',
				author: '1 autor',
				place: '1. místo',
				image: 'games/01.jpg',
				desc: 'Oč méně je vítězná hra kreativní svým názvem, o to lepší gameplay nabízí. Skvěle mechanicky používá ingredienci smrtí to nekončí a v několika levelech předkládá hráči větší a větší výzvy.',
			},
			{
				team: 'Tým Zelený čaj',
				author: '1 autor',
				place: 'nejlepší dabing',
				image: 'games/02.jpg',
				desc: 'Hra hýřící kreativitou. Válka posledního kartového kluka a šachových figur je skvěle nadabována od intra až po outro, figury mají různé strategie boje a především poslední boss je skutečnou výzvou.',
			},
			{
				team: 'Tým FW',
				author: '3 autoři',
				place: 'skvělé mechaniky',
				image: 'games/03.jpg',
				desc: 'Tahová hra, která se inspiruje především ingrediencí "smrtí to nekončí" - neb malých pěšců je nespočet. O co víc tým vyladil jednotlivé použití ingrediencí, o to víc však nevyladil samotný gameplay.',
			},
			{
				team: 'R2',
				author: '5 autorů',
				place: 'nejlepší příběh',
				image: 'games/04.jpg',
				desc: 'Tým vytvořil hru poetickou,  hlubokou a zábavnou. A jak sama hra říká: "V reálném světě není magický poklad, konstantní stav blaženosti. Jsi odsouzen k nepřetržitému a opakovanému hledání štěstí a další životy nemáš." Carpe Diem.',
			},
			{
				team: 'Tým Crossover',
				author: '3 autoři',
				place: 'VR hra',
				image: 'games/05.jpg',
				desc: 'Multifakultní tým se pustil do velké výzvy, a to vytvoření VR hry pro Oculus Quest. Náročného úkolku se zhostil skvěle, a to včetně velmi intenzivního dabingu. Hru, nebo spíše soubor miniher propojených motivem zvěrokruhu, si s potěšením zahrál každý porotce.',
			},
			{
				team: 'Tým Restless',
				author: '4 autoři',
				place: 'nejlepší animace',
				image: 'games/06.jpg',
				desc: 'Hra trochu doplatila na dichotomii 2D a 3D. Ukázkové a krásné ručně kreslené intro v kontrastu s pěkně rozpohybovanými 3D modely žolíka v kresleném prostředí šlo v tomto případě obtížně dohromady.',
			},
		],
	},
];
