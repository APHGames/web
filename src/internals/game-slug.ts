export function slugFor(game: { id: number; name: string }): string {
	const base = game.name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return `${base || 'game'}-${game.id}`;
}
