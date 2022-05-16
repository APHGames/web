import { translate } from "@docusaurus/Translate";

export type Slide = {
	group: number;
	id: string;
	hint?: string;
	desc?: string;
	date?: string;
};

export type SlideSection = {
	name: string;
	slides: Slide[];
};

export const slidesData: SlideSection[] = [
	{
		name: translate({message: 'pages.lectures'}),
		slides: [
			{
				group: 1,
				id: 'lecture_org',
				hint: translate({message: 'pages.lectures.intro'}),
				desc: translate({message: 'pages.lectures.organization'})
			},
			{
				group: 2,
				id: 'lecture01',
				hint: `${translate({message: 'pages.lectures.lecture'})} 1`,
				desc: translate({message: 'pages.lectures.games'})
			},
			{
				group: 2,
				id: 'lecture02',
				hint: `${translate({message: 'pages.lectures.lecture'})} 2`,
				desc: translate({message: 'pages.lectures.engines'})
			},
			{
				id: 'lecture03',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 3`,
				desc: translate({message: 'pages.lectures.assets'})
			},
			{
				id: 'lecture04',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 4`,
				desc: translate({message: 'pages.lectures.components'})
			},
			{
				id: 'lecture05',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 5`,
				desc: translate({message: 'pages.lectures.patterns'})
			},
			{
				id: 'lecture06',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 6`,
				desc: translate({message: 'pages.lectures.audio'})
			},
			{
				id: 'lecture07',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 7`,
				desc: translate({message: 'pages.lectures.space'})
			},
			{
				id: 'lecture08',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 8`,
				desc: translate({message: 'pages.lectures.physics'})
			},
			{
				id: 'lecture09',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 9`,
				desc: translate({message: 'pages.lectures.graphics'})
			},
			{
				id: 'lecture10',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 10`,
				desc: translate({message: 'pages.lectures.ai'})
			},
			{
				id: 'lecture11',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 11`,
				desc: translate({message: 'pages.lectures.multiplayer'})
			},
			{
				id: 'lecture12',
				group: 2,
				hint: `${translate({message: 'pages.lectures.lecture'})} 12`,
				desc: translate({message: 'pages.lectures.design'})
			},
		],
	},
	{
		name: translate({message: 'pages.minitalks'}),
		slides: [
			{
				group: 1,
				id: 'minitalk_mechanics',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.mechanics'}),
			},
			{
				group: 1,
				id: 'minitalk_speedrunning',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.speedrunning'}),
			},
			{
				group: 1,
				id: 'minitalk_styles',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.styles'}),
			},
			{
				group: 1,
				id: 'minitalk_adventures',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.adventures'}),
			},
			{
				group: 1,
				id: 'minitalk_storytelling',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.storytelling'}),
			},
			{
				group: 1,
				id: 'minitalk_leveldesign',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.leveldesign'}),
			},
			{
				group: 1,
				id: 'minitalk_demoscene',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.demoscene'}),
			},
			{
				group: 1,
				id: 'minitalk_blizzard',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.blizzard'}),
			},
			{
				group: 1,
				id: 'minitalk_solodevs',
				hint: translate({message: 'pages.minitalks.minitalk'}),
				desc: translate({message: 'pages.minitalks.solodevs'}),
			},
		],
	},
];
