import React from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import EventLayout from '@site/src/components/events/EventLayout';
import FaqList from '@site/src/components/events/FaqList';
import { gamehackFaq } from '@site/src/internals/events/gamehack';

const GameHackFaqPage = () => (
	<EventLayout kind="gamehack" title={translate({ message: 'events.gamehack.faq' })}>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.faq' })}</h1>
				<FaqList items={gamehackFaq} />
			</div>
		</section>
	</EventLayout>
);

export default GameHackFaqPage;
