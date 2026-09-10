import React from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import EventLayout from '@site/src/components/events/EventLayout';
import FaqList from '@site/src/components/events/FaqList';
import { gamejamFaq } from '@site/src/internals/events/gamejam';

const GameJamFaqPage = () => (
	<EventLayout kind="gamejam" title={translate({ message: 'events.gamejam.faq' })}>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.faq' })}</h1>
				<FaqList items={gamejamFaq} />
			</div>
		</section>
	</EventLayout>
);

export default GameJamFaqPage;
