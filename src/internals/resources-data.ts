export type ResourceField = {
	key: string;
	value: string;
};

export type ResourceItem = {
	title: string;
	subTitle?: string;
	link: string;
	linkDesc: boolean;
	description?: string;
	fields?: ResourceField[];
	icon: string;
};

export type ResourceSection = {
	name: string;
	resources: ResourceItem[];
};

export const resourcesData: ResourceSection[] = [
	{
		name: 'Assets',
		resources: [
			{
				title: 'Open Game Art',
				subTitle: 'Various game assets',
				link: 'https://opengameart.org/',
				linkDesc: true,
				icon: 'assets/asset_gameart.jpg',
			},
			{
				title: 'Free3D',
				subTitle: 'Free 3D models',
				link: 'https://free3d.com',
				linkDesc: true,

				icon: 'assets/asset_free3D.jpg',
			},
			{
				title: 'Spriters Resources',
				subTitle: 'Sprites from existing games (for inspiration)',
				link: 'https://www.spriters-resource.com/',
				linkDesc: true,
				icon: 'assets/asset_spriters.jpg',
			},
			{
				title: 'Pixel-art icons',
				subTitle: 'Pixel-art icons from devianart',
				link: 'https://www.deviantart.com/7soul1/art/420-Pixel-Art-Icons-for-RPG-129892453/',
				linkDesc: false,
				icon: 'assets/asset_pixelicons.jpg',
			},
			{
				title: 'Game icons',
				subTitle: 'Free game icons',
				link: 'https://game-icons.net/',
				linkDesc: true,
				icon: 'assets/asset_gameicons.jpg',
			},
			{
				title: 'Blender models',
				subTitle: 'Free Blender models',
				link: 'https://www.blender-models.com/',
				linkDesc: true,
				icon: 'assets/asset_blender.jpg',
			},
			{
				title: 'Reiner\'s Tilesets',
				subTitle: 'Free Tilesets',
				link: 'https://www.reinerstilesets.de/',
				linkDesc: true,
				icon: 'assets/asset_tilesets.jpg',
			},
			{
				title: 'Vecteezy',
				subTitle: 'Free Vector Art',
				link: 'https://www.vecteezy.com/',
				linkDesc: true,
				icon: 'assets/asset_vecteezy.jpg',
			},
			{
				title: 'Texture King',
				subTitle: 'Free Textures',
				link: 'https://www.textureking.com/',
				linkDesc: true,
				icon: 'assets/asset_textures.jpg',
			},
			{
				title: 'GameSounds.xyz',
				subTitle: 'Royalty-free sounds',
				link: 'https://gamesounds.xyz/',
				linkDesc: true,
				icon: 'assets/asset_gamesound.jpg',
			},
			{
				title: 'FreePd',
				subTitle: 'Public Domain Music',
				link: 'https://freepd.com/',
				linkDesc: true,
				icon: 'assets/asset_freepd.jpg',
			},
			{
				title: 'FreeSFX',
				subTitle: 'Free Sound Effects',
				link: 'https://www.freesfx.co.uk/',
				linkDesc: true,
				icon: 'assets/asset_freesfx.jpg',
			},
		],
	},
	{
		name: 'Portals',
		resources: [
			{
				title: 'Itch.Io',
				subTitle: 'For sharing free indie games',
				link: 'https://itch.io/',
				linkDesc: true,
				icon: 'portals/portal_itchio.jpg',
			},
			{
				title: 'Games.cz',
				subTitle: 'CZ portal with latest news from Game Industry',
				link: 'https://games.tiscali.cz/',
				linkDesc: true,
				icon: 'portals/portal_tiscali.jpg',
			},
			{
				title: 'Game Developer',
				subTitle: 'Former Gamasutra, portal for gamedev articles',
				link: 'https://www.gamedeveloper.com/',
				linkDesc: true,
				icon: 'portals/portal_gamedev.jpg',
			},
			{
				title: 'Unseen',
				subTitle: 'Never released games',
				link: 'https://www.unseen64.net/',
				linkDesc: true,
				icon: 'portals/portal_unseen.jpg',
			},
			{
				title: 'How Long To Beat',
				subTitle: 'How long it takes to beat a game DB',
				link: 'https://howlongtobeat.com/',
				linkDesc: true,
				icon: 'portals/portal_howlong.jpg',
			},
			{
				title: 'Game Clones',
				subTitle: 'List of open-source clones',
				link: 'http://osgameclones.com/',
				linkDesc: true,
				icon: 'portals/portal_clones.jpg',
			},
		],
	},
	{
		name: 'Books',
		resources: [
			{
				title: 'Game Engine Architecture (3rd ed.)',
				subTitle: 'Json Gregory, 2018',
				fields: [
					{
						key: 'Lectures',
						value: 'Games, Engines, Assets, Audio, Physics, Space',
					},
				],
				link: 'https://www.amazon.com/Engine-Architecture-Third-Jason-Gregory/dp/1138035459',
				linkDesc: false,
				icon: 'books/book_game_engine_arch.jpg',
			},
			{
				title: 'Game Programming Patterns',
				subTitle: 'Robert Nystrom, 2014',
				fields: [
					{
						key: 'Lectures',
						value: 'Patterns',
					},
				],
				link: 'https://www.amazon.com/Game-Programming-Patterns-Robert-Nystrom/dp/0990582906',
				linkDesc: false,
				icon: 'books/book_programming_patterns.jpg',
			},
			{
				title: 'Game Sound',
				subTitle: 'Karen Collins, 2008',
				fields: [
					{
						key: 'Lectures',
						value: 'Audio',
					},
				],
				link: 'https://www.amazon.com/Game-Sound-Introduction-History-Practice/dp/026253777X',
				linkDesc: false,
				icon: 'books/book_audio.jpg',
			},
			{
				title: 'Essential Mathematics for Games and Interactive Applications',
				subTitle: 'Van Verth, 2008',
				fields: [
					{
						key: 'Lectures',
						value: 'Space, Physics',
					},
				],
				link: 'https://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978',
				linkDesc: false,
				icon: 'books/book_math_for_games.jpg',
			},
			{
				title: 'Procedural Generation in Game Design ',
				subTitle: 'Tayna Short, Tarn Adams, 2017',
				fields: [
					{
						key: 'Lectures',
						value: 'Space, Physics, Design',
					},
				],
				link: 'https://www.amazon.com/Procedural-Generation-Design-Tanya-Short/dp/1498799191',
				linkDesc: false,
				icon: 'books/book_procedural_generation.jpg',
			},
			{
				title: 'Game Physics Engine Development',
				subTitle: 'Ian Millington, 2010',
				fields: [
					{
						key: 'Lectures',
						value: 'Physics',
					},
				],
				link: 'https://www.amazon.com/Game-Physics-Engine-Development-Commercial-Grade/dp/0123819768',
				linkDesc: false,
				icon: 'books/book_physics.jpg',
			},
			{
				title: 'Programming Game AI by Example',
				subTitle: 'Mat Buckland, 2005',
				fields: [
					{
						key: 'Lectures',
						value: 'Game AI',
					},
				],
				link: 'https://www.amazon.com/Programming-Example-Wordware-Developers-Library/dp/1556220782',
				linkDesc: false,
				icon: 'books/book_ai_by_example.jpg',
			},
			{
				title: 'Artificial Intelligence: A Modern Approach (4th ed.)',
				subTitle: 'Stuart Russell, 2020',
				fields: [
					{
						key: 'Lectures',
						value: 'Game AI',
					},
				],
				link: 'https://www.amazon.com/Artificial-Intelligence-A-Modern-Approach/dp/0134610997',
				linkDesc: false,
				icon: 'books/book_ai_modern_approach.jpg',
			},
			{
				title: 'Multiplayer Game Programming',
				subTitle: 'Joshua Glazer, 2015',
				fields: [
					{
						key: 'Lectures',
						value: 'Multiplayer',
					},
				],
				link: 'https://www.amazon.com/Multiplayer-Game-Programming-Architecting-Networked/dp/0134034309',
				linkDesc: false,
				icon: 'books/book_multiplayer.jpg',
			},
			{
				title: 'Level Up! The Guide to Great Video Game Design',
				subTitle: 'Scott Rogers, 2014',
				fields: [
					{
						key: 'Lectures',
						value: 'Design',
					},
				],
				link: 'https://www.amazon.com/Level-Guide-Great-Video-Design/dp/1118877160',
				linkDesc: false,
				icon: 'books/book_levelup.jpg',
			},
			{
				title: 'Theory of Fun for Game Design',
				subTitle: 'Raph Koster, 2004',
				fields: [
					{
						key: 'Lectures',
						value: 'Design',
					},
				],
				link: 'https://www.amazon.com/Theory-Game-Design-Raph-Koster/dp/1449363210',
				linkDesc: false,
				icon: 'books/book_theory_of_fun.jpg',
			},
			{
				title: 'Games, Design and Play: A detailed approach to iterative game design',
				linkDesc: false,
				subTitle: 'Colleen Macklin, 2016',
				fields: [
					{
						key: 'Lectures',
						value: 'Games, Design',
					},
				],
				link: 'https://www.amazon.com/Games-Design-Play-detailed-iterative-ebook/dp/B01FWERIOY',
				icon: 'books/book_games.jpg',
			},
		],
	},
];
