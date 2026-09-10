import React from 'react';
import { translate } from '@docusaurus/Translate';
import EventLayout from '@site/src/components/events/EventLayout';
import EventHome from '@site/src/components/events/EventHome';
import { gamehackHome } from '@site/src/internals/events/gamehack';

const GameHackPage = () => (
	<EventLayout kind="gamehack" title={translate({ message: 'config.events_gamehack' })}>
		<EventHome data={gamehackHome} />
	</EventLayout>
);

export default GameHackPage;
