import { translate } from '@docusaurus/Translate';

export type ResourceItem = {
	title: string;
	subTitle?: string;
	link: string;
	linkDesc: boolean;
	description?: string;
	icon: string;
	locale?: string;
};

export type ResourceSection = {
	name: string;
	resources: ResourceItem[];
};

export const resourcesData: ResourceSection[] = [
	{
		name: translate({ message: 'pages.resources.assets' }),
		resources: [
			{
				title: 'Open Game Art',
				subTitle: translate({ message: 'pages.resources.assets.opengameart' }),
				link: 'https://opengameart.org/',
				linkDesc: true,
				icon: 'assets/asset_gameart.jpg',
			},
			{
				title: 'Free3D',
				subTitle: translate({ message: 'pages.resources.assets.free3d' }),
				link: 'https://free3d.com',
				linkDesc: true,
				icon: 'assets/asset_free3D.jpg',
			},
			{
				title: 'Spriters Resources',
				subTitle: translate({ message: 'pages.resources.assets.spriters' }),
				link: 'https://www.spriters-resource.com/',
				linkDesc: true,
				icon: 'assets/asset_spriters.jpg',
			},
			{
				title: 'Pixel-art icons',
				subTitle: translate({ message: 'pages.resources.assets.pixelart' }),
				link: 'https://www.deviantart.com/7soul1/art/420-Pixel-Art-Icons-for-RPG-129892453/',
				linkDesc: false,
				icon: 'assets/asset_pixelicons.jpg',
			},
			{
				title: 'Game icons',
				subTitle: translate({ message: 'pages.resources.assets.gameicons' }),
				link: 'https://game-icons.net/',
				linkDesc: true,
				icon: 'assets/asset_gameicons.jpg',
			},
			{
				title: 'Blender models',
				subTitle: translate({ message: 'pages.resources.assets.blender' }),
				link: 'https://www.blender-models.com/',
				linkDesc: true,
				icon: 'assets/asset_blender.jpg',
			},
			{
				title: 'Reiner\'s Tilesets',
				subTitle: translate({ message: 'pages.resources.assets.tilesets' }),
				link: 'https://www.reinerstilesets.de/',
				linkDesc: true,
				icon: 'assets/asset_tilesets.jpg',
			},
			{
				title: 'Vecteezy',
				subTitle: translate({ message: 'pages.resources.assets.vecteezy' }),
				link: 'https://www.vecteezy.com/',
				linkDesc: true,
				icon: 'assets/asset_vecteezy.jpg',
			},
			{
				title: 'Texture King',
				subTitle: translate({ message: 'pages.resources.assets.texking' }),
				link: 'https://www.textureking.com/',
				linkDesc: true,
				icon: 'assets/asset_textures.jpg',
			},
			{
				title: 'GameSounds.xyz',
				subTitle: translate({ message: 'pages.resources.assets.gamesounds' }),
				link: 'https://gamesounds.xyz/',
				linkDesc: true,
				icon: 'assets/asset_gamesound.jpg',
			},
			{
				title: 'FreePd',
				subTitle: translate({ message: 'pages.resources.assets.freepd' }),
				link: 'https://freepd.com/',
				linkDesc: true,
				icon: 'assets/asset_freepd.jpg',
			},
			{
				title: 'FreeSFX',
				subTitle: translate({ message: 'pages.resources.assets.freesfx' }),
				link: 'https://www.freesfx.co.uk/',
				linkDesc: true,
				icon: 'assets/asset_freesfx.jpg',
			},
		],
	},
	{
		name: translate({ message: 'pages.resources.portals' }),
		resources: [
			{
				title: 'Itch.Io',
				subTitle: translate({ message: 'pages.resources.portals.itchio' }),
				link: 'https://itch.io/',
				linkDesc: true,
				icon: 'portals/portal_itchio.jpg',
			},
			{
				title: 'Games.cz',
				subTitle: translate({ message: 'pages.resources.portals.gamescz' }),
				link: 'https://games.tiscali.cz/',
				linkDesc: true,
				icon: 'portals/portal_tiscali.jpg',
				locale: 'cs',
			},
			{
				title: 'Game Developer',
				subTitle: translate({ message: 'pages.resources.portals.gamedev' }),
				link: 'https://www.gamedeveloper.com/',
				linkDesc: true,
				icon: 'portals/portal_gamedev.jpg',
			},
			{
				title: 'Unseen',
				subTitle: translate({ message: 'pages.resources.portals.unseen' }),
				link: 'https://www.unseen64.net/',
				linkDesc: true,
				icon: 'portals/portal_unseen.jpg',
			},
			{
				title: 'How Long To Beat',
				subTitle: translate({ message: 'pages.resources.portals.howlong' }),
				link: 'https://howlongtobeat.com/',
				linkDesc: true,
				icon: 'portals/portal_howlong.jpg',
			},
			{
				title: 'Game Clones',
				subTitle: translate({ message: 'pages.resources.portals.clones' }),
				link: 'http://osgameclones.com/',
				linkDesc: true,
				icon: 'portals/portal_clones.jpg',
			},
		],
	},
	{
		name: translate({ message: 'pages.resources.books' }),
		resources: [
			{
				title: 'Game Engine Architecture (3rd ed.)',
				subTitle: 'Json Gregory, 2018',
				link: 'https://www.amazon.com/Engine-Architecture-Third-Jason-Gregory/dp/1138035459',
				linkDesc: false,
				icon: 'books/book_game_engine_arch.jpg',
			},
			{
				title: 'Game Programming Patterns',
				subTitle: 'Robert Nystrom, 2014',
				link: 'https://www.amazon.com/Game-Programming-Patterns-Robert-Nystrom/dp/0990582906',
				linkDesc: false,
				icon: 'books/book_programming_patterns.jpg',
			},
			{
				title: 'Game Sound',
				subTitle: 'Karen Collins, 2008',
				link: 'https://www.amazon.com/Game-Sound-Introduction-History-Practice/dp/026253777X',
				linkDesc: false,
				icon: 'books/book_audio.jpg',
			},
			{
				title: 'Essential Mathematics for Games and Interactive Applications',
				subTitle: 'Van Verth, 2008',
				link: 'https://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978',
				linkDesc: false,
				icon: 'books/book_math_for_games.jpg',
			},
			{
				title: 'Procedural Generation in Game Design ',
				subTitle: 'Tayna Short, Tarn Adams, 2017',
				link: 'https://www.amazon.com/Procedural-Generation-Design-Tanya-Short/dp/1498799191',
				linkDesc: false,
				icon: 'books/book_procedural_generation.jpg',
			},
			{
				title: 'Game Physics Engine Development',
				subTitle: 'Ian Millington, 2010',
				link: 'https://www.amazon.com/Game-Physics-Engine-Development-Commercial-Grade/dp/0123819768',
				linkDesc: false,
				icon: 'books/book_physics.jpg',
			},
			{
				title: 'Programming Game AI by Example',
				subTitle: 'Mat Buckland, 2005',
				link: 'https://www.amazon.com/Programming-Example-Wordware-Developers-Library/dp/1556220782',
				linkDesc: false,
				icon: 'books/book_ai_by_example.jpg',
			},
			{
				title: 'Artificial Intelligence: A Modern Approach (4th ed.)',
				subTitle: 'Stuart Russell, 2020',
				link: 'https://www.amazon.com/Artificial-Intelligence-A-Modern-Approach/dp/0134610997',
				linkDesc: false,
				icon: 'books/book_ai_modern_approach.jpg',
			},
			{
				title: 'Multiplayer Game Programming',
				subTitle: 'Joshua Glazer, 2015',
				link: 'https://www.amazon.com/Multiplayer-Game-Programming-Architecting-Networked/dp/0134034309',
				linkDesc: false,
				icon: 'books/book_multiplayer.jpg',
			},
			{
				title: 'Level Up! The Guide to Great Video Game Design',
				subTitle: 'Scott Rogers, 2014',
				link: 'https://www.amazon.com/Level-Guide-Great-Video-Design/dp/1118877160',
				linkDesc: false,
				icon: 'books/book_levelup.jpg',
			},
			{
				title: 'Theory of Fun for Game Design',
				subTitle: 'Raph Koster, 2004',
				link: 'https://www.amazon.com/Theory-Game-Design-Raph-Koster/dp/1449363210',
				linkDesc: false,
				icon: 'books/book_theory_of_fun.jpg',
			},
			{
				title: 'Games, Design and Play: A detailed approach to iterative game design',
				linkDesc: false,
				subTitle: 'Colleen Macklin, 2016',
				link: 'https://www.amazon.com/Games-Design-Play-detailed-iterative-ebook/dp/B01FWERIOY',
				icon: 'books/book_games.jpg',
			},
		],
	},
];
