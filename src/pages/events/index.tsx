import React from 'react';
import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import layoutStyles from '@site/src/css/layout.module.scss';

const tiles = [
	{
		href: '/events/gamehack',
		image: '/img/pages/events/gamehack/parallax/mobile.png',
		titleKey: 'config.events_gamehack',
		hintKey: 'events.gamehack.hint',
	},
	{
		href: '/events/gamejam',
		image: '/img/pages/events/gamejam/photo.jpg',
		titleKey: 'config.events_gamejam',
		hintKey: 'events.gamejam.hint',
	},
];

const EventsPage = () => {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout description={siteConfig.customFields.description as string} title={translate({ message: 'events.title' })}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<div className={layoutStyles.page}>
				<section className={clsx(layoutStyles.section, layoutStyles.featureSection)}>
					<div className={layoutStyles.sectionInner}>
						<span className={layoutStyles.sectionLabel}>{translate({ message: 'config.events' })}</span>
						<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.title' })}</h1>
						<div className={layoutStyles.featureGrid} data-count="2">
							{tiles.map((tile) => (
								<Link key={tile.href} className={layoutStyles.featureTile} to={tile.href}>
									<img className={layoutStyles.featureImage} src={tile.image} alt="" />
									<span className={layoutStyles.featureOverlay} />
									<span className={layoutStyles.featureShine} />
									<span className={layoutStyles.featureBody}>
										<h2 className={layoutStyles.featureTitle}>{translate({ message: tile.titleKey })}</h2>
										<p className={layoutStyles.featureHint}>{translate({ message: tile.hintKey })}</p>
									</span>
								</Link>
							))}
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default EventsPage;
