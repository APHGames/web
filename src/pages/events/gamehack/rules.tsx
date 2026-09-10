import React from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import EventLayout from '@site/src/components/events/EventLayout';
import RulesList from '@site/src/components/events/RulesList';
import { gamehackRules } from '@site/src/internals/events/gamehack';

const GameHackRulesPage = () => (
	<EventLayout kind="gamehack" title={translate({ message: 'events.gamehack.rules' })}>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.rules' })}</h1>
				<RulesList sections={gamehackRules} />
			</div>
		</section>
	</EventLayout>
);

export default GameHackRulesPage;
