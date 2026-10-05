const path = require('path');

module.exports = function worthwhileGamesRoutes() {
	return {
		name: 'worthwhile-games-routes',
		async contentLoaded({ actions }) {
			actions.addRoute({
				path: '/games/:slug',
				component: '@site/src/components/WorthwhileGameArticle.tsx',
				exact: true,
			});
		},
		configureWebpack() {
			return {
				module: {
					rules: [
						{
							// Match .mdx as well so Docusaurus skips its MDX fallback
							// for this folder and the files stay plain markdown strings.
							test: /\.mdx?$/i,
							include: path.resolve(__dirname, '../content/worthwhile'),
							type: 'asset/source',
						},
					],
				},
			};
		},
	};
};
