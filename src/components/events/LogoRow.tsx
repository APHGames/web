import React from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import { LogoItem } from '@site/src/internals/events/types';

const LogoRow = ({
	logos,
	labelKey,
}: {
	logos: LogoItem[];
	labelKey: string;
}) => (
	<section className={layoutStyles.section}>
		<div className={layoutStyles.sectionInner}>
			<span className={layoutStyles.sectionLabel}>{translate({ message: labelKey })}</span>
			<div className={eventStyles.logoRow}>
				{logos.map((logo) => (
					<img className={eventStyles.logo} src={logo.src} alt={logo.alt} key={logo.src} />
				))}
			</div>
		</div>
	</section>
);

export default LogoRow;
