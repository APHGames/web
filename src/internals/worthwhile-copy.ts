type CopyModule = { default?: string } | string;

type CopyContext = {
	keys(): string[];
	(id: string): CopyModule;
};

declare const require: {
	context(directory: string, useSubdirectories: boolean, filter: RegExp): CopyContext;
};

const read = (loaded: CopyModule) => (typeof loaded === 'string' ? loaded : loaded.default || '');

const load = (context: CopyContext) => {
	const articles: Record<number, string> = {};
	context.keys().forEach((key) => {
		const match = key.match(/-(\d+)\.md$/);
		if (!match) return;
		articles[parseInt(match[1], 10)] = read(context(key));
	});
	return articles;
};

const czechArticles = load(require.context('../../content/worthwhile/cs', false, /\.md$/));
const englishArticles = load(require.context('../../content/worthwhile/en', false, /\.md$/));

export const articleFor = (id: number, czech: boolean) => (
	(czech ? czechArticles : englishArticles)[id] || ''
);
