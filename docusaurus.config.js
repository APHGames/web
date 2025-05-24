const path = require('path')
const config = require('./web.config');

// parse the current locale from CLI
const idx = process.argv.findIndex(arg => arg === '--locale');
// fallback to EN by default
const currentLocale = (idx !== -1) ? process.argv[idx + 1] : 'en';
const isLocaleCS = currentLocale === 'cs';
const isLocaleEN = currentLocale === 'en';

let url = config.urls[currentLocale];
const i18n = require(path.resolve(__dirname, `i18n/${currentLocale}/code.json`));

// custom fields for the whole app (including data from web.config)
const customFields = {
	copyright: `Copyright © ${new Date().getFullYear()} ${config.owner}`,
	description: 'APHGames Web',
	url,
	currentLocale,
	...config,
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const output = {
	title: i18n['config.title'].message,
	url: url,
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.png',
	organizationName: config.org,
	projectName: 'aphgames-web',
	i18n: {
		defaultLocale: currentLocale,
		locales: [currentLocale], /* the other locale is in another domain */
	},
	customFields,
	plugins: [
		[path.resolve(__dirname, 'plugins/docusaurus-search-local'), {
			// whether to index docs pages
			indexDocs: true,
			// Whether to also index the titles of the parent categories in the sidebar of a doc page.
			// 0 = disable, 1 = direct parent, 2 = nested parents
			indexDocSidebarParentCategories: 3,
			indexBlog: true,
			indexPages: true,
			// ru is a hack for replacing cs, as cs is not supported by the plugin by default
			language: ["en", "ru"],
	  
			// setting this to "none" will prevent the default CSS to be included. The default CSS
			style: undefined,
	  
			// lunr.js-specific settings
			lunr: {
			  tokenizerSeparator: /[\s\-]+/,
			  // how important is the length of the document
			  b: 0.75,
			  // boost to common words (doesn't work properly for CZ)
			  k1: 1.2,
			  titleBoost: 5,
			  contentBoost: 1,
			  parentCategoriesBoost: 2, // Only used when indexDocSidebarParentCategories > 0
		}}],
		require.resolve('docusaurus-plugin-sass'),
	],
	themeConfig: {
		metadata: [
			{
				name: 'keywords', 
				content: i18n['config.keywords'].message
			},
			{
				name: 'keywords', 
				content: i18n['config.keywords'].message
			}
		],
		colorMode: {
			defaultMode: 'dark',
			 /* I really don't have time to maintain two versions of each diagram */
			disableSwitch: true,
		},
		image: 'img/oglogo.png',
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
					label: i18n['config.materials'].message,
					position: 'left',
					to: '/docs/learning/intro',
				},
				{
					label: i18n['config.courses'].message,
					position: 'left',
					items: [
						{
							label: i18n['config.courses_aph'].message,
							to: '/docs/courses/aph',
						},
					]
				},
				/* {
					label: 'Blog',
					to: '/blog/',
					position: 'left'
				}, */
				{
					label: i18n['config.brand'].message,
					position: 'left',
					to: '/docs/brand/',
				},
				{
					label: i18n['config.gallery'].message,
					position: 'left',
					to: '/gallery',
				},
				{
					label: i18n['config.archive'].message,
					position: 'left',
					items: [
						{
							label: 'NI-APH 2021',
							href: 'https://semester2021.aphgames.io'
						},
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
					label: isLocaleCS ?  '🇬🇧' : '🇨🇿',
					"aria-label": i18n['config.lang'].message,
					className: 'header-lang-link',
					position: 'right',
					href: isLocaleCS ? config.urls['en'] : config.urls['cs'],
				},
				{
					label: ' ',
					className: 'header-github-link',
					"aria-label": 'GitHub',
					position: 'right',
					href: config.github,
				},
			]
		},
		footer: {
			copyright: `Copyright ©  ${new Date().getFullYear()} ${config.owner}`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					sidebarItemsGenerator: 		
						async function({
						  defaultSidebarItemsGenerator,
						  ...args
						}) {
							// exclude all items that have "exclude_<lang>" in their header based on the locale
							// this allow us to completely remove some pages for respective languages 
							args.docs = args.docs.filter(m => (!isLocaleCS || !m.frontMatter.exclude_cs) && (!isLocaleEN || !m.frontMatter.exclude_en));
							const sidebarItems = await defaultSidebarItemsGenerator(args);
							return sidebarItems;
						},
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

if(isLocaleCS) {
	// add next to the archive
	output.themeConfig.navbar.items.splice(output.themeConfig.navbar.items.length - 3, 0, {
		label: i18n['config.artifacts'].message,
		position: 'left',
		to: '/artifacts',
	});

	// add between language and github
	output.themeConfig.navbar.items.splice(output.themeConfig.navbar.items.length - 1, 0, {
		label: ' ',
		className: 'header-youtube-link',
		position: 'right',
		href: config.youtube,	});
}

module.exports = output;