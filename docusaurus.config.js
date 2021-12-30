const customFields = {
	copyright: `Copyright © ${new Date().getFullYear()} Adam Vesecký`,
	description: 'APHGames Web',
}

const url = 'https://aphgames.io'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'APH Games',
	url: url,
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.png',
	organizationName: 'DoDoLab',
	projectName: 'aphgames-wiki',
	customFields,
	plugins: [
		require.resolve('@cmfcmf/docusaurus-search-local'),
		[
			'@docusaurus/plugin-ideal-image',
			{
				quality: 100,
				steps: 2 // the max number of images generated between min and max (inclusive)
			}
		],
		require.resolve('docusaurus-plugin-sass')
	],
	themeConfig: {
		colorMode: {
			defaultMode: 'dark',
			disableSwitch: false,
			switchConfig: {
				darkIcon: '🌙',
				lightIcon: '🌞',
			},
		},
		image: 'img/minilogo.png',
		prism: {
			defaultLanguage: 'javascript',
			theme: require('./src/internals/prism-aph-light'),
			darkTheme: require('./src/internals/prism-aph-dark'),
		},
		navbar: {
			title: ' ',
			logo: {
				alt: 'APHGames',
				src: '/img/navbar/logo.svg'
			},
			items: [
				{
					label: 'NI-APH course',
					position: 'left',
					to: '/docs/niaph/intro',
				},
				{
					label: 'Brand',
					position: 'left',
					to: '/docs/brand/',
				},
				{
					label: 'Resources',
					position: 'left',
					to: '/resources',
				},
				{
					label: 'Archive',
					position: 'left',
					items: [
						{
							label: 'NI-APH 2020',
							href: 'https://semester2020.aphgames.io'
						},
						{
							label: 'MI-APH 2019',
							href: 'https://semester2019.aphgames.io'
						},
						{
							label: 'MI-APH 2018',
							href: 'https://www.dropbox.com/s/pin6nvqp714hh7x/FIT_APH.zip?dl=0'
						},
						{
							label: 'MI-APH 2017',
							href: 'https://www.dropbox.com/s/89su9beu24a0m1r/FIT_APH_2017.zip?dl=0'
						}
					]
				},
				{
					label: 'Github',
					position: 'right',
					href: 'https://github.com/APHGames',
				},
				{
					label: 'Youtube channel',
					position: 'right',
					href: 'https://www.youtube.com/channel/UC1PTa9NCygXV_0IgOBRMw-Q',
				},
				/*	{
						label: 'Blog',
						to: '/blog/',
						position: 'left'
					}*/
			]
		},
		footer: {
			copyright: 'Copyright © 2021 Adam Vesecký',
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: 'all',
						copyright: customFields.copyright
					},
					showReadingTime: true
				},
				theme: {
					customCss: require.resolve('./src/css/global.scss')
				},
			},
		],
	],
};
