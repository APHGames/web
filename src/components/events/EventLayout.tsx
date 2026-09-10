import React from 'react';
import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import { EventKind } from '@site/src/internals/events/types';

type NavItem = {
	to: string;
	label: string;
	exact?: boolean;
};

const EventLayout = ({
	kind,
	title,
	children,
}: {
	kind: EventKind;
	title: string;
	children: React.ReactNode;
}) => {
	const { siteConfig } = useDocusaurusContext();
	const { pathname } = useLocation();
	const base = `/events/${kind}`;
	const seriesKey = kind === 'gamehack' ? 'config.events_gamehack' : 'config.events_gamejam';
	const items: NavItem[] = [
		{ to: base, label: translate({ message: seriesKey }), exact: true },
		{ to: `${base}/rules`, label: translate({ message: 'events.rules' }) },
		{ to: `${base}/faq`, label: translate({ message: 'events.faq' }) },
		...(kind === 'gamejam'
			? [{ to: `${base}/archive`, label: translate({ message: 'events.archive' }) }]
			: []),
	];

	return (
		<Layout description={siteConfig.customFields.description as string} title={title}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<div className={layoutStyles.page}>
				<section className={clsx(layoutStyles.section, eventStyles.subnavSection)}>
					<div className={layoutStyles.sectionInner}>
						<nav className={eventStyles.subnav} aria-label={title}>
							{items.map((item) => {
								const active = item.exact
									? pathname === item.to || pathname === `${item.to}/`
									: pathname.startsWith(item.to);
								return (
									<Link
										key={item.to}
										to={item.to}
										className={clsx(eventStyles.subnavLink, active && eventStyles.subnavLinkActive)}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>
					</div>
				</section>
				{children}
			</div>
		</Layout>
	);
};

export default EventLayout;
