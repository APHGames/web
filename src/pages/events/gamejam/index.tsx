import React from 'react';
import { translate } from '@docusaurus/Translate';
import EventLayout from '@site/src/components/events/EventLayout';
import EventHome from '@site/src/components/events/EventHome';
import { gamejamHome } from '@site/src/internals/events/gamejam';

const GameJamPage = () => (
	<EventLayout kind="gamejam" title={translate({ message: 'config.events_gamejam' })}>
		<EventHome data={gamejamHome} />
	</EventLayout>
);

export default GameJamPage;
