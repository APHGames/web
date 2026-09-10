import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import { EventHomeData } from '@site/src/internals/events/types';
import EventHero from './EventHero';
import LogoRow from './LogoRow';
import Programme from './Programme';

const EventHome = ({ data }: { data: EventHomeData }) => (
	<>
		<EventHero title={data.heroTitle} variant={data.kind} />
		<LogoRow logos={data.organizers} labelKey="events.organizers" />
		{data.trailerYoutubeId && (
			<section className={layoutStyles.section}>
				<div className={layoutStyles.sectionInner}>
					<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.trailer' })}</span>
					<div className={eventStyles.videoFrame}>
						<iframe
							src={`https://www.youtube.com/embed/${data.trailerYoutubeId}`}
							title={translate({ message: 'events.trailer' })}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					</div>
				</div>
			</section>
		)}
		<section
			className={clsx(layoutStyles.section, data.welcomeBackgroundSrc && eventStyles.welcomePhoto)}
			style={data.welcomeBackgroundSrc ? { backgroundImage: `url(${data.welcomeBackgroundSrc})` } : undefined}
		>
			<div className={layoutStyles.sectionInner}>
				<span className={layoutStyles.sectionLabel}>{translate({ message: 'events.welcome' })}</span>
				<div className={eventStyles.welcomeWrap}>
					<div className={layoutStyles.aboutGrid} data-stack="true">
						<div className={layoutStyles.aboutPanel}>
							<h3>{data.welcomeDate}</h3>
							{data.welcomeHtml.map((html) => (
								<p key={html.slice(0, 24)} dangerouslySetInnerHTML={{ __html: html }} />
							))}
						</div>
					</div>
					<div className={eventStyles.sleepover}>
						<img src={data.sleepoverSrc} alt="" />
					</div>
				</div>
			</div>
		</section>
		<Programme days={data.programme} />
		<LogoRow logos={data.sponsors} labelKey="events.sponsors" />
	</>
);

export default EventHome;
