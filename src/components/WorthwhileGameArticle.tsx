import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from '@site/src/css/worthwhile-article.module.scss';
import { articleFor } from '@site/src/internals/worthwhile-copy';
import { slugFor } from '@site/src/internals/game-slug';
import catalogData from '@site/src/internals/worthwhile-games.json';
import mediaData from '@site/src/internals/worthwhile-media.json';

type Game = {
	id: number;
	name: string;
	year: number;
	platformCs: string;
	platformEn: string;
	developerCs: string;
	developerEn: string;
	genreCs: string;
	genreEn: string;
	categories: string[];
	image: string | null;
	pixelated: boolean;
	imageSource: string | null;
	imageLicense: string | null;
};

type MediaItem = {
	src: string;
	kind: 'cover' | 'screenshot' | 'poster' | 'artwork';
	pixelated?: boolean;
	source?: string | null;
	license?: string | null;
};

type PageProps = {
	match?: { params?: { slug?: string } };
};

type Block = { kind: 'text'; text: string } | { kind: 'image'; alt: string; src: string };

const GAMES = catalogData as Game[];
const MEDIA = mediaData as Record<string, MediaItem[]>;
const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/;

const mediaBySrc = new Map<string, MediaItem>();
Object.values(MEDIA).forEach((items) => {
	items.forEach((item) => mediaBySrc.set(item.src, item));
});

const blocksOf = (markdown: string): Block[] => markdown
	.split(/\n\s*\n/)
	.map((part) => part.trim())
	.filter(Boolean)
	.map((part) => {
		const image = part.match(IMAGE);
		if (image) return { kind: 'image', alt: image[1], src: image[2] };
		return { kind: 'text', text: part.replace(/\s+/g, ' ') };
	});

const Figure = ({ alt, src, side }: { alt: string; src: string; side: 'left' | 'right' }) => {
	const item = mediaBySrc.get(src);
	return (
		<figure className={clsx(styles.figure, styles[side], item?.pixelated && styles.pixel)}>
			<img src={src} alt={alt} />
			<figcaption>
				{alt}
				{item?.license && item.source && (
					<>
						{' · '}
						<a href={item.source} target="_blank" rel="noreferrer">{item.license}</a>
					</>
				)}
			</figcaption>
		</figure>
	);
};

const WorthwhileGameArticle = ({ match }: PageProps) => {
	const { siteConfig } = useDocusaurusContext();
	const czech = siteConfig.customFields.currentLocale === 'cs';
	const text = (en: string, cs: string) => (czech ? cs : en);
	const slug = match?.params?.slug || '';
	const index = GAMES.findIndex((item) => slugFor(item) === slug);
	const game = index >= 0 ? GAMES[index] : null;

	useEffect(() => {
		if (!game) return;
		document.title = `${game.name} (${game.year}) | ${siteConfig.title}`;
	}, [game, siteConfig.title]);

	if (!game) {
		return (
			<Layout title={text('Game', 'Hra')}>
				<p className={styles.missing}>
					{text('This title is not in the index.', 'Tenhle titul v indexu není.')}
					{' '}
					<Link to="/docs/learning/worthwhile-games">{text('Back to the 500', 'Zpět na 500 her')}</Link>
				</p>
			</Layout>
		);
	}

	const blocks = blocksOf(articleFor(game.id, czech));
	let side: 'left' | 'right' = 'right';
	let textIndex = 0;
	const previous = index > 0 ? GAMES[index - 1] : null;
	const next = index < GAMES.length - 1 ? GAMES[index + 1] : null;
	const description = blocks.find((block) => block.kind === 'text');

	return (
		<Layout
			title={`${game.name} (${game.year})`}
			description={description && description.kind === 'text' ? description.text : game.name}
			wrapperClassName={styles.shell}
		>
			<div className={styles.page}>
				<Link className={styles.back} to="/docs/learning/worthwhile-games">
					{text('← 500 Worthwhile Games', '← 500 nej her')}
				</Link>
				<article className={styles.sheet}>
					<p className={styles.kicker}>
						{text('Worthwhile Games', 'Nej hry')}
						{' · No. '}
						{String(game.id).padStart(3, '0')}
					</p>
					<h1>{game.name}</h1>
					<ul className={styles.facts}>
						<li>{game.year}</li>
						<li>{czech ? game.platformCs : game.platformEn}</li>
						<li>{czech ? game.developerCs : game.developerEn}</li>
						<li>{czech ? game.genreCs : game.genreEn}</li>
					</ul>
					<hr className={styles.rule} />
					<div className={styles.copy}>
						{blocks.map((block) => {
							if (block.kind === 'image') {
								const figureSide = side;
								side = side === 'right' ? 'left' : 'right';
								return <Figure key={block.src} alt={block.alt} src={block.src} side={figureSide} />;
							}
							const lead = textIndex === 0;
							textIndex += 1;
							return (
								<p key={block.text.slice(0, 48)} className={lead ? styles.lead : undefined}>
									{block.text}
								</p>
							);
						})}
					</div>
					<nav className={styles.pager}>
						{previous ? (
							<Link to={`/games/${slugFor(previous)}`}>{`← ${previous.name}`}</Link>
						) : <span />}
						{next ? (
							<Link to={`/games/${slugFor(next)}`}>{`${next.name} →`}</Link>
						) : <span />}
					</nav>
				</article>
			</div>
		</Layout>
	);
};

export default WorthwhileGameArticle;
