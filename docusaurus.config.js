const path = require('path')


// parse the current locale from CLI
const idx = process.argv.findIndex(arg => arg === '--locale');
const currentLocale = (idx !== -1) ? process.argv[idx + 1] : 'en';
const isLocaleCS = currentLocale === 'cs';
const isLocaleEN = currentLocale === 'en';

let url = '';
switch(currentLocale) {
	case 'cs':
		url = 'https://aphgames.cz';
		break;
	case 'en':
	default:
		url = 'https://aphgames.io';

}

const i18n = require(path.resolve(__dirname, `i18n/${currentLocale}/static.ts`));

const customFields = {
	copyright: `Copyright © ${new Date().getFullYear()} Adam Vesecký`,
	description: 'APHGames Web',
	url,
	currentLocale,
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const output = {
	title: i18n['config.title'],
	url: url,
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.png',
	organizationName: 'DoDoLab',
	projectName: 'aphgames-wiki',
	i18n: {
		defaultLocale: currentLocale,
		locales: ['en', 'cs'],
	},
	customFields,
	plugins: [
		[path.resolve(__dirname, 'plugins/docusaurus-search-local'), {
			// whether to index docs pages
			indexDocs: true,
	  
			// Whether to also index the titles of the parent categories in the sidebar of a doc page.
			// 0 disables this feature.
			// 1 indexes the direct parent category in the sidebar of a doc page
			// 2 indexes up to two nested parent categories of a doc page
			// 3...
			//
			// Do _not_ use Infinity, the value must be a JSON-serializable integer.
			indexDocSidebarParentCategories: 3,
	  
			// whether to index blog pages
			indexBlog: true,
	  
			// whether to index static pages 404.html is never indexed
			indexPages: true,
	  
			// fr is a hack for replacing cs, as cs is not supported by the plugin by default
			language: ["en", "fr"],
	  
			// setting this to "none" will prevent the default CSS to be included. The default CSS
			style: undefined,
	  
			// lunr.js-specific settings
			lunr: {
			  // When indexing your documents, their content is split into "tokens".
			  // Text entered into the search box is also tokenized.
			  // This setting configures the separator used to determine where to split the text into tokens.
			  // By default, it splits the text at whitespace and dashes.
			  //
			  // Note: Does not work for "ja" and "th" languages, since these use a different tokenizer.
			  tokenizerSeparator: /[\s\-]+/,
			  // https://lunrjs.com/guides/customising.html#similarity-tuning
			  //
			  // This parameter controls the importance given to the length of a document and its fields. This
			  // value must be between 0 and 1, and by default it has a value of 0.75. Reducing this value
			  // reduces the effect of different length documents on a term’s importance to that document.
			  b: 0.75,
			  // This controls how quickly the boost given by a common word reaches saturation. Increasing it
			  // will slow down the rate of saturation and lower values result in quicker saturation. The
			  // default value is 1.2. If the collection of documents being indexed have high occurrences
			  // of words that are not covered by a stop word filter, these words can quickly dominate any
			  // similarity calculation. In these cases, this value can be reduced to get more balanced results.
			  k1: 1.2,
			  // By default, we rank pages where the search term appears in the title higher than pages where
			  // the search term appears in just the text. This is done by "boosting" title matches with a
			  // higher value than content matches. The concrete boosting behavior can be controlled by changing
			  // the following settings.
			  titleBoost: 5,
			  contentBoost: 1,
			  parentCategoriesBoost: 2, // Only used when indexDocSidebarParentCategories > 0
		}}],
		require.resolve('docusaurus-plugin-sass'),
	],
	themeConfig: {
			colorMode: {
			defaultMode: 'dark',
			disableSwitch: true,
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
					label: i18n['config.materials'],
					position: 'left',
					to: '/docs/learning/intro',
				},
				{
					label: i18n['config.brand'],
					position: 'left',
					to: '/docs/brand/',
				},
				{
					label: i18n['config.gallery'],
					position: 'left',
					to: '/gallery',
				},
				{
					label: i18n['config.archive'],
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
					position: 'right',
					href: isLocaleCS ? 'https://aphgames.io' : 'https://aphgames.cz',
				},
				{
					label: 'GitHub',
					position: 'right',
					href: 'https://github.com/APHGames',
				},
			]
		},
		footer: {
			copyright: `Copyright ©  ${new Date().getFullYear()} Adam Vesecký`,
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
							// exclude all items that have "exclude_xx" in their header based on the locale
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
		label: i18n['config.artifacts'],
		position: 'left',
		to: '/artifacts',
	});

	output.themeConfig.navbar.items.push({
		label: i18n['config.youtube'],
		position: 'right',
		href: 'https://www.youtube.com/channel/UC1PTa9NCygXV_0IgOBRMw-Q',
	});
}

module.exports = output;