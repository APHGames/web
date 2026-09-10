import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import { ProgrammeDay } from '@site/src/internals/events/types';

const Programme = ({ days }: { days: ProgrammeDay[] }) => (
	<section className={layoutStyles.section}>
		<div className={layoutStyles.sectionInner}>
			<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.programme' })}</span>
			<div className={layoutStyles.aboutGrid} data-count="3">
				{days.map((day) => (
					<div className={layoutStyles.aboutPanel} key={day.title}>
						<h3>{day.title}</h3>
						<div className={eventStyles.agenda}>
							{day.items.map((item) => (
								<React.Fragment key={`${day.title}-${item.time}-${item.label}`}>
									<div className={clsx(eventStyles.agendaTime, item.highlight && eventStyles.agendaHighlight)}>{item.time}</div>
									<div className={clsx(eventStyles.agendaLabel, item.highlight && eventStyles.agendaHighlight)}>{item.label}</div>
								</React.Fragment>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default Programme;
