import React from 'react';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import EventLayout from '@site/src/components/events/EventLayout';
import RulesList from '@site/src/components/events/RulesList';
import { gamejamRules } from '@site/src/internals/events/gamejam';

const GameJamRulesPage = () => (
	<EventLayout kind="gamejam" title={translate({ message: 'events.gamejam.rules' })}>
		<section className={layoutStyles.section}>
			<div className={layoutStyles.sectionInner}>
				<h1 className={layoutStyles.sectionHeading}>{translate({ message: 'events.rules' })}</h1>
				<RulesList sections={gamejamRules} />
			</div>
		</section>
	</EventLayout>
);

export default GameJamRulesPage;
