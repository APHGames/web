const aphColors = require('./aph-colors');

const theme = {
	plain: {
		color: aphColors.rhino100,
		backgroundColor: aphColors.rhino10,
	},
	styles: [
		{
			types: ['comment', 'prolog', 'cdata'],
			style: {
				color: aphColors.rhino40,
			},
		},
		{
			types: ['delimiter', 'boolean', 'selector', 'important', 'atrule'],
			style: {
				color: aphColors.emerald,
			},
		},
		{
			types: ['keyword'],
			style: {
				color: aphColors.tomatoDark,
			},
		},
		{
			types: ['punctuation', 'attr-name'],
			style: {
				color: aphColors.rhino80,
			},
		},
		{
			types: ['operator'],
			style: {
				color: aphColors.emeraldDark,
			},
		},
		{
			types: ['tag', 'doctype', 'builtin'],
			style: {
				color: aphColors.royal,
			},
		},
		{
			types: ['entity', 'number', 'symbol'],
			style: {
				color: aphColors.emerald,
			},
		},
		{
			types: ['property', 'constant', 'variable'],
			style: {
				color: aphColors.emerald,
			},
		},
		{
			types: ['string', 'char'],
			style: {
				color: aphColors.emerald,
			},
		},
		{
			types: ['attr-value'],
			style: {
				color: aphColors.royal,
			},
		},
		{
			types: ['url'],
			style: {
				color: aphColors.royal,
			},
		},
		{
			types: ['function'],
			style: {
				color: aphColors.royal,
			},
		},
		{
			types: ['regex'],
			style: {
				color: aphColors.rhino40,
			},
		},
		{
			types: ['inserted'],
			style: {
				color: aphColors.rhino40,
			},
		},
		{
			types: ['deleted'],
			style: {
				color: aphColors.rhino40,
			},
		},
	],
};

module.exports = theme;
