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
		name: 'Lectures',
		slides: [
			{
				group: 1,
				id: 'lecture_org',
				hint: 'Intro',
				desc: 'Organization'
			},
			{
				group: 1,
				id: 'summary',
				hint: 'Summary',
				desc: 'Course Summary'
			},
			{
				group: 2,
				id: 'lecture01',
				hint: 'Lecture 1',
				desc: 'Games'
			},
			{
				group: 2,
				id: 'lecture02',
				hint: 'Lecture 2',
				desc: 'Engines',
			},
			{
				id: 'lecture03',
				group: 2,
				hint: 'Lecture 3',
				desc: 'Assets',
			},
			{
				id: 'lecture04',
				group: 2,
				hint: 'Lecture 4',
				desc: 'Components',
			},
			{
				id: 'lecture05',
				group: 2,
				hint: 'Lecture 5',
				desc: 'Patterns',
			},
			{
				id: 'lecture06',
				group: 2,
				hint: 'Lecture 6',
				desc: 'Audio',
			},
			{
				id: 'lecture07',
				group: 2,
				hint: 'Lecture 7',
				desc: 'Space',
			},
			{
				id: 'lecture08',
				group: 2,
				hint: 'Lecture 8',
				desc: 'Physics',
			},
			{
				id: 'lecture09',
				group: 2,
				hint: 'Lecture 9',
				desc: 'Graphics'
			},
			{
				id: 'lecture10',
				group: 2,
				hint: 'Lecture 10',
				desc: 'Game AI',
			},
			{
				id: 'lecture11',
				group: 2,
				hint: 'Lecture 11',
				desc: 'Multiplayer',
			},
			{
				id: 'lecture12',
				group: 2,
				hint: 'Lecture 12',
				desc: 'Design',
			},
		],
	},
	{
		name: 'Minitalks',
		slides: [
			{
				group: 1,
				id: 'minitalk_mechanics',
				hint: 'Minitalk',
				desc: 'Essential Mechanics',
			},
			{
				group: 1,
				id: 'minitalk_speedrunning',
				hint: 'Minitalk',
				desc: 'Speedrunning',
			},
			{
				group: 1,
				id: 'minitalk_styles',
				hint: 'Minitalk',
				desc: 'Game Art Styles',
			},
			{
				group: 1,
				id: 'minitalk_adventures',
				hint: 'Minitalk',
				desc: 'Adventure Games',
			},
			{
				group: 1,
				id: 'minitalk_storytelling',
				hint: 'Minitalk',
				desc: 'Storytelling',
			},
			{
				group: 1,
				id: 'minitalk_leveldesign',
				hint: 'Minitalk',
				desc: 'Level Design',
			},
			{
				group: 1,
				id: 'minitalk_demoscene',
				hint: 'Minitalk',
				desc: 'Demoscene',
			},
			{
				group: 1,
				id: 'minitalk_blizzard',
				hint: 'Minitalk',
				desc: 'The Story of Blizzard',
			},
			{
				group: 1,
				id: 'minitalk_solodevs',
				hint: 'Minitalk',
				desc: 'Solo Developers',
			},
		],
	},
];
