import React, { useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import EventLayout from '@site/src/components/events/EventLayout';
import PhotoLooper from '@site/src/components/events/PhotoLooper';
import GameCard from '@site/src/components/events/GameCard';
import {
	gamejamArchiveIntro,
	gamejamArchiveYears,
	gamejamRecaps,
} from '@site/src/internals/events/gamejam-archive';
import { ArchiveYear } from '@site/src/internals/events/types';

const pad = (index: number) => String(index + 1).padStart(2, '0');

const YearBlock = ({ year }: { year: ArchiveYear }) => {
	const photos = useMemo(
		() => Array.from({ length: year.photoCount }, (_, index) => ({
			index,
			sort: Math.random(),
		})).sort((a, b) => a.sort - b.sort),
		[year.photoCount],
	);

	return (
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h2 className={layoutStyles.sectionHeading}>{year.title}</h2>
				<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.ingredients' })}</span>
				<div className={eventStyles.ingredientGrid}>
					{Array.from({ length: year.ingredientCount }).map((_, index) => (
						<div className={eventStyles.ingredient} key={`${year.id}-ing-${index}`}>
							<img src={`${year.basePath}/ingredients/${pad(index)}.jpg`} alt="" />
						</div>
					))}
				</div>
				<div className={eventStyles.looperFrame}>
					<PhotoLooper speed={0.1} direction="left">
						{photos.map(({ index }) => (
							<img
								className={eventStyles.looperImage}
								src={`${year.basePath}/${pad(index)}.jpg`}
								alt=""
								key={`${year.id}-photo-${index}`}
							/>
						))}
					</PhotoLooper>
				</div>
				<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.games' })}</span>
				<div className={layoutStyles.aboutGrid} data-stack="true">
					{year.games.map((game) => (
						<GameCard game={game} basePath={year.basePath} key={game.team} />
					))}
				</div>
			</div>
		</section>
	);
};

const GameJamArchivePage = () => (
	<EventLayout kind="gamejam" title={translate({ message: 'events.gamejam.archive' })}>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.archive' })}</h1>
				<div className={layoutStyles.aboutGrid} data-stack="true">
					<div className={layoutStyles.aboutPanel}>
						{gamejamArchiveIntro.paragraphs.map((text) => (
							<p key={text.slice(0, 24)}>{text}</p>
						))}
						<p>{translate({ message: 'events.ingredients' })}</p>
						<ul>
							{gamejamArchiveIntro.ingredients.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<ul className={eventStyles.linkList}>
							{gamejamArchiveIntro.links.map((link) => (
								<li key={link.href}>
									<a href={link.href} target="_blank" rel="noreferrer noopener">{link.label}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.recaps' })}</span>
				<div className={eventStyles.recapGrid}>
					{gamejamRecaps.map((recap) => (
						<div key={recap.youtubeId}>
							<h3 className={layoutStyles.sectionHeading}>{recap.title}</h3>
							<div className={eventStyles.videoFrame}>
								<iframe
									src={`https://www.youtube.com/embed/${recap.youtubeId}`}
									title={recap.title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
		{gamejamArchiveYears.map((year) => (
			<YearBlock year={year} key={year.id} />
		))}
	</EventLayout>
);

export default GameJamArchivePage;
