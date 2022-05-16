import { translate } from "@docusaurus/Translate";

export type Item = {
	id: string;
	name: string;
	tech: string;
};

export type GallerySection = {
	name: string;
	items?: Item[];
};

export const galleryData: GallerySection[] = [
	{
		name: translate({message : 'gallery.preview' }),
		items: [
			{
				id: 'aph/vlak',
				name: translate({message : 'gallery.vlak' }),
				tech: 'PixiJS'
			},
			{
				id: 'aph/tetris',
				name: translate({message : 'gallery.tetris' }),
				tech: 'PixiJS'
			},
		],
	},
	{
		name: translate({message : 'gallery.aph2021' }),
		items: [
			{
				id: '2021/aphd',
				name: 'APH Dungeon',
				tech: 'Godot'
			},
			{
				id: '2021/berzerk',
				name: 'Berzerk',
				tech: 'PixiJS'
			},
			{
				id: '2021/chickenquest',
				name: 'Chicken Quest',
				tech: 'PixiJS'
			},
			{
				id: '2021/darkness',
				name: 'Darkness',
				tech: 'PixiJS'
			},
			{
				id: '2021/discredited',
				name: 'Discredited',
				tech: 'Godot'
			},
			{
				id: '2021/endlessrunner',
				name: 'Endless Runner',
				tech: 'PixiJS'
			},
			{
				id: '2021/escapethedungeon',
				name: 'Escape the Dungeon',
				tech: 'PixiJS'
			},
			{
				id: '2021/infectious',
				name: 'Infectious',
				tech: 'PixiJS'
			},
			{
				id: '2021/manera',
				name: 'Manera',
				tech: 'Unity'
			},
			{
				id: '2021/mortesin',
				name: 'Mortesin',
				tech: 'Unity'
			},
			{
				id: '2021/revolution',
				name: 'Revolution',
				tech: 'PixiJS'
			},
			{
				id: '2021/shroomhunt',
				name: 'Shroom Hunt',
				tech: 'PixiJS'
			},
			{
				id: '2021/snake',
				name: 'Snake++',
				tech: 'PixiJS'
			},
			{
				id: '2021/snowdrifter',
				name: 'Snowdrifter',
				tech: 'PixiJS'
			},
			{
				id: '2021/spinnytankz',
				name: 'Spinny Tankz',
				tech: 'PixiJS'
			},
			{
				id: '2021/tanktrouble',
				name: 'Tank Trouble',
				tech: 'PixiJS'
			},
			{
				id: '2021/tankwars',
				name: 'Tank Wars',
				tech: 'PixiJS'
			},
			{
				id: '2021/vegninja',
				name: 'Veg Ninja',
				tech: 'PixiJS'
			},
		]
		
	},
	{
		name: translate({message : 'gallery.aph2020' }),
		items: [
			{
				id: '2020/aphshooter',
				name: 'APH Shooter',
				tech: 'PixiJS'
			},
			{
				id: '2020/bomberfman',
				name: 'Bomber f*ing man',
				tech: 'PixiJS'
			},
			{
				id: '2020/enigmaticforest',
				name: 'Enigmatic Forest',
				tech: 'PixiJS'
			},
			{
				id: '2020/fullspeedahead',
				name: 'Full Speed Ahead',
				tech: 'PixiJS'
			},
			{
				id: '2020/gravityguy',
				name: 'Gravity Guy',
				tech: 'PixiJS'
			},
			{
				id: '2020/jackman',
				name: 'Jackman',
				tech: 'PixiJS'
			},
			{
				id: '2020/jimjump',
				name: 'Jim Jump',
				tech: 'PixiJS'
			},
			{
				id: '2020/jumper',
				name: 'Jumper',
				tech: 'PixiJS'
			},
			{
				id: '2020/jumper2',
				name: 'Jumper',
				tech: 'PixiJS'
			},
			{
				id: '2020/potionkitchen',
				name: 'Potion Kitchen',
				tech: 'PixiJS'
			},
			{
				id: '2020/roperace',
				name: 'Rope Race',
				tech: 'PixiJS'
			},
			{
				id: '2020/sleepwell',
				name: 'Sleep Well',
				tech: 'PixiJS'
			},
			{
				id: '2020/spacedefenseforce',
				name: 'Space Defense Force',
				tech: 'PixiJS'
			},
			{
				id: '2020/spaceinvaders',
				name: 'Space Invaders',
				tech: 'PixiJS'
			},
			{
				id: '2020/tetrisplus',
				name: 'Tetris Plus',
				tech: 'PixiJS'
			},
			{
				id: '2020/towerdefense',
				name: 'Tower Defense',
				tech: 'PixiJS'
			}
		],
	},
	{
		name: translate({message : 'gallery.aph2019' }),
		items: [
			{
				id: '2019/balloon',
				name: 'Balloon',
				tech: 'PixiJS'
			},
			{
				id: '2019/ballz',
				name: 'Ballz',
				tech: 'PixiJS'
			},
			{
				id: '2019/blockjumper',
				name: 'Block Jumper',
				tech: 'PixiJS'
			},
			{
				id: '2019/bomberman',
				name: 'Bomberman',
				tech: 'PixiJS'
			},
			{
				id: '2019/bulletsnake',
				name: 'Bullet Snake',
				tech: 'PixiJS'
			},
			{
				id: '2019/castlefight',
				name: 'Castle Fight',
				tech: 'PixiJS'
			},
			{
				id: '2019/pong',
				name: 'Pong',
				tech: 'PixiJS'
			},
			{
				id: '2019/sokoban',
				name: 'Sokoban',
				tech: 'PixiJS'
			}
		],
	},
	{
		name: translate({message : 'gallery.aph2018' }),
		items: [
			{
				id: '2018/aphsimulator',
				name: 'APH Test Simulator',
				tech: 'PixiJS'
			},
			{
				id: '2018/applefarm',
				name: 'Apple Farm',
				tech: 'PixiJS'
			},
			{
				id: '2018/battlecity',
				name: 'Battle City',
				tech: 'PixiJS'
			},
			{
				id: '2018/dynablaster',
				name: 'Dyna Blaster',
				tech: 'PixiJS'
			},
			{
				id: '2018/had',
				name: 'Had',
				tech: 'PixiJS'
			},
			{
				id: '2018/shmup',
				name: 'Shmup',
				tech: 'PixiJS'
			},
			{
				id: '2018/spaceimpact',
				name: 'Space Impact',
				tech: 'PixiJS'
			},
			{
				id: '2018/volcanoescape',
				name: 'Volcano Escape',
				tech: 'PixiJS'
			}
		]
	},
	{
		name: translate({message : 'gallery.aph2017' }),
		items: [
			{
				id: '2017/arkanoid',
				name: translate({message : 'gallery.arkanoid' }),
				tech: 'PixiJS'
			},
			{
				id: '2017/pacman',
				name: translate({message : 'gallery.pacman' }),
				tech: 'PixiJS'
			},
			{
				id: '2017/paratrooper',
				name: translate({message : 'gallery.paratrooper' }),
				tech: 'PixiJS'
			},
		]
	},
];
