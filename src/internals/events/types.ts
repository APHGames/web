export type EventKind = 'gamehack' | 'gamejam';

export type LogoItem = {
	src: string;
	alt: string;
};

export type ProgrammeItem = {
	time: string;
	label: string;
	highlight?: boolean;
};

export type ProgrammeDay = {
	title: string;
	items: ProgrammeItem[];
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type RuleItem = {
	html: string;
	children?: string[];
};

export type RuleSection = {
	title: string;
	items: RuleItem[];
};

export type EventHomeData = {
	kind: EventKind;
	title: string;
	heroTitle: string;
	welcomeDate: string;
	welcomeHtml: string[];
	sleepoverSrc: string;
	welcomeBackgroundSrc?: string;
	programme: ProgrammeDay[];
	organizers: LogoItem[];
	sponsors: LogoItem[];
	trailerYoutubeId?: string;
};

export type ArchiveGame = {
	team: string;
	author: string;
	place: string;
	image: string;
	desc: string;
};

export type ArchiveYear = {
	id: string;
	title: string;
	ingredientCount: number;
	photoCount: number;
	basePath: string;
	games: ArchiveGame[];
};

export type ArchiveRecap = {
	title: string;
	youtubeId: string;
};
