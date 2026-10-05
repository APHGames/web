import clsx from 'clsx';
import Link from '@docusaurus/Link';
import React, { useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '@site/src/css/worthwhile-games.module.scss';
import { articleFor } from '@site/src/internals/worthwhile-copy';
import { slugFor } from '@site/src/internals/game-slug';
import catalogData from '@site/src/internals/worthwhile-games.json';

type Game = {
	id: number;
	name: string;
	year: number;
	platformCs: string;
	platformEn: string;
	developerCs: string;
	developerEn: string;
	genreCs: string;
	genreEn: string;
	categories: string[];
	image: string | null;
	pixelated: boolean;
	imageSource: string | null;
	imageLicense: string | null;
};

type Category = {
	id: string;
	group: 'gen' | 'theme';
	en: string;
	cs: string;
	blurbEn: string;
	blurbCs: string;
};

const GAMES = catalogData as Game[];

const CATEGORIES: Category[] = [
	{
		id: 'gen1',
		group: 'gen',
		en: '1st generation and prehistory',
		cs: '1. generace a prehistorie',
		blurbEn: 'Before cartridges. Spacewar!, Pong and the first grammar of real-time play.',
		blurbCs: 'Ještě před cartridgemi. Spacewar!, Pong a první gramatika hry v reálném čase.',
	},
	{
		id: 'gen2',
		group: 'gen',
		en: '2nd-generation consoles',
		cs: '2. generace konzolí',
		blurbEn: 'Atari 2600 and Intellivision: a cartridge, two players, and almost no memory.',
		blurbCs: 'Atari 2600 a Intellivision: cartridge, dva hráči a skoro žádná paměť.',
	},
	{
		id: 'gen3',
		group: 'gen',
		en: '8-bit consoles',
		cs: 'Osmibitové konzole',
		blurbEn: 'Famicom, NES, Master System and Game Boy. The platformer, the dungeon and the JRPG learn their shape.',
		blurbCs: 'Famicom, NES, Master System a Game Boy. Plošinovka, dungeon a JRPG se tu učí svůj tvar.',
	},
	{
		id: 'gen4',
		group: 'gen',
		en: '16-bit consoles',
		cs: '16bitové konzole',
		blurbEn: 'SNES and Mega Drive. Mode 7, secret exits, and the last great decade of pure 2D.',
		blurbCs: 'SNES a Mega Drive. Mode 7, tajné východy a poslední velká dekáda čistého 2D.',
	},
	{
		id: 'gen5',
		group: 'gen',
		en: '32/64-bit consoles',
		cs: '32/64bitové konzole',
		blurbEn: 'PlayStation, Saturn and Nintendo 64. The medium has to invent cameras, analog sticks and 3D space.',
		blurbCs: 'PlayStation, Saturn a Nintendo 64. Médium si musí vymyslet kameru, analogové páčky a 3D prostor.',
	},
	{
		id: 'gen6',
		group: 'gen',
		en: '6th generation',
		cs: '6. generace',
		blurbEn: 'Dreamcast, PlayStation 2, GameCube and Xbox. Open cities, online networks and the modern action camera.',
		blurbCs: 'Dreamcast, PlayStation 2, GameCube a Xbox. Otevřená města, online sítě a moderní akční kamera.',
	},
	{
		id: 'gen7',
		group: 'gen',
		en: '7th generation',
		cs: '7. generace',
		blurbEn: 'Xbox 360, PlayStation 3 and Wii. HD production, motion controls and the live online service.',
		blurbCs: 'Xbox 360, PlayStation 3 a Wii. HD produkce, pohybové ovládání a živá online služba.',
	},
	{
		id: 'gen8',
		group: 'gen',
		en: '8th generation',
		cs: '8. generace',
		blurbEn: 'PlayStation 4, Xbox One, Wii U and Switch. The open world becomes the default big-game shape.',
		blurbCs: 'PlayStation 4, Xbox One, Wii U a Switch. Otevřený svět se stává výchozím tvarem velké hry.',
	},
	{
		id: 'gen9',
		group: 'gen',
		en: '9th generation',
		cs: '9. generace',
		blurbEn: 'PlayStation 5, Xbox Series and the newest releases. A provisional canon, not a thirty-year verdict.',
		blurbCs: 'PlayStation 5, Xbox Series a nejnovější tituly. Zatím provizorní kánon, ne verdikt po třiceti letech.',
	},
	{
		id: 'graphics',
		group: 'theme',
		en: 'Breakthrough graphics',
		cs: 'Přelomová grafika',
		blurbEn: 'Games that changed what a picture of a game was allowed to look like.',
		blurbCs: 'Hry, které změnily, jak smí obraz hry vypadat.',
	},
	{
		id: 'mechanics',
		group: 'theme',
		en: 'Inventive mechanics',
		cs: 'Inovativní mechaniky',
		blurbEn: 'A new verb. Jump, portal, parry, rewind, capture, or a rule the player can rewrite.',
		blurbCs: 'Nové sloveso. Skok, portál, parry, rewind, capture, nebo pravidlo, které hráč smí přepsat.',
	},
	{
		id: 'narrative',
		group: 'theme',
		en: 'Story and narrative',
		cs: 'Příběh a vyprávění',
		blurbEn: 'Games whose fiction is carried by characters, staging, or the way the player is allowed to refuse the plot.',
		blurbCs: 'Hry, jejichž fikci nesou postavy, režie, nebo to, že hráč smí zápletku odmítnout.',
	},
	{
		id: 'systemic',
		group: 'theme',
		en: 'Systemic design',
		cs: 'Systémový design',
		blurbEn: 'Worlds where systems answer each other: light, economy, physics, factions, consequences.',
		blurbCs: 'Světy, ve kterých si systémy odpovídají: světlo, ekonomika, fyzika, frakce, důsledky.',
	},
	{
		id: 'multiplayer',
		group: 'theme',
		en: 'Multiplayer and online',
		cs: 'Multiplayer a online',
		blurbEn: 'From one cabinet and two paddles to persistent worlds, ladders and games that are also social institutions.',
		blurbCs: 'Od jednoho kabinetu a dvou pálek k persistentním světům, žebříčkům a hrám, které jsou zároveň společenskou institucí.',
	},
	{
		id: 'open-world',
		group: 'theme',
		en: 'Open worlds',
		cs: 'Otevřené světy',
		blurbEn: 'Sandboxes where leaving the mission is part of the design, not a bug.',
		blurbCs: 'Sandboxy, ve kterých je opuštění mise součást designu, ne chyba.',
	},
];

const GROUP_LABEL = {
	gen: { en: 'Console generations', cs: 'Generace konzolí' },
	theme: { en: 'What it changed', cs: 'Co to změnilo' },
};

function decadeKey(year: number): number {
	return Math.floor(year / 10) * 10;
}

function decadeLabel(year: number, czech: boolean): string {
	const start = decadeKey(year);
	if (!czech) {
		return `${start}s`;
	}
	if (start === 2000) return 'Nultá léta';
	if (start === 2010) return '10. léta';
	if (start === 2020) return '20. léta';
	return `${String(start).slice(2)}. léta`;
}

const WorthwhileGamesCatalog = () => {
	const { siteConfig } = useDocusaurusContext();
	const czech = siteConfig.customFields.currentLocale === 'cs';
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('all');

	const text = (en: string, cs: string) => (czech ? cs : en);
	const categoryById = useMemo(() => {
		const map = new Map<string, Category>();
		CATEGORIES.forEach((item) => map.set(item.id, item));
		return map;
	}, []);

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		return GAMES.filter((game) => {
			if (category !== 'all' && !game.categories.includes(category)) {
				return false;
			}
			if (!needle) {
				return true;
			}
			const platform = czech ? game.platformCs : game.platformEn;
			const genre = czech ? game.genreCs : game.genreEn;
			const developer = czech ? game.developerCs : game.developerEn;
			const article = articleFor(game.id, czech);
			const haystack = `${game.name} ${game.year} ${platform} ${genre} ${developer} ${article}`.toLowerCase();
			return haystack.includes(needle);
		});
	}, [category, czech, query]);

	const activeCategory = categoryById.get(category);

	let lastDecade = -1;

	return (
		<div className={styles.catalog}>
			<div className={styles.toolbar}>
				<input
					className={styles.search}
					type="search"
					value={query}
					placeholder={text('Search by name, year, platform, mechanic…', 'Hledat podle jména, roku, platformy, mechaniky…')}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<div className={styles.group}>
					<button
						type="button"
						className={clsx(styles.chip, category === 'all' && styles.chipActive)}
						onClick={() => setCategory('all')}
					>
						{text(`All ${GAMES.length}`, `Všechny ${GAMES.length}`)}
					</button>
				</div>
				{(['gen', 'theme'] as const).map((group) => (
					<div className={styles.group} key={group}>
						<div className={styles.groupLabel}>{text(GROUP_LABEL[group].en, GROUP_LABEL[group].cs)}</div>
						{CATEGORIES.filter((item) => item.group === group).map((item) => {
							const count = GAMES.filter((game) => game.categories.includes(item.id)).length;
							return (
								<button
									type="button"
									key={item.id}
									className={clsx(styles.chip, category === item.id && styles.chipActive)}
									onClick={() => setCategory(item.id)}
								>
									{text(item.en, item.cs)}
									{' '}
									{count}
								</button>
							);
						})}
					</div>
				))}
				{activeCategory && (
					<p className={styles.blurb}>{text(activeCategory.blurbEn, activeCategory.blurbCs)}</p>
				)}
				<p className={styles.count}>
					{czech
						? `${filtered.length} ${filtered.length === 1 ? 'hra' : (filtered.length >= 2 && filtered.length <= 4 ? 'hry' : 'her')} v tomhle pohledu`
						: `${filtered.length} ${filtered.length === 1 ? 'game' : 'games'} in this view`}
				</p>
			</div>

			{filtered.length === 0 && (
				<p className={styles.empty}>{text('Nothing matches this filter.', 'Tomuhle filtru nic neodpovídá.')}</p>
			)}

			<div className={styles.grid}>
				{filtered.map((game) => {
					const showDecade = decadeKey(game.year) !== lastDecade;
					lastDecade = decadeKey(game.year);
					const platform = czech ? game.platformCs : game.platformEn;
					const genre = czech ? game.genreCs : game.genreEn;
					return (
						<React.Fragment key={game.id}>
							{showDecade && <h2 className={styles.decade}>{decadeLabel(game.year, czech)}</h2>}
							<Link className={styles.card} to={`/games/${slugFor(game)}`}>
								<div className={clsx(styles.shot, game.pixelated && styles.pixel)}>
									{game.image ? (
										<img src={game.image} alt="" loading="lazy" />
									) : (
										<div className={styles.placeholder}>{game.year}</div>
									)}
								</div>
								<div className={styles.meta}>
									<div className={styles.name}>{game.name}</div>
									<div className={styles.sub}>
										{game.year}
										{' · '}
										{genre}
									</div>
									<div className={styles.sub}>{platform}</div>
								</div>
							</Link>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default WorthwhileGamesCatalog;
