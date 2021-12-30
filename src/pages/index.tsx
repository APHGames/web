import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import Layout from '@theme/Layout';

import featureStyles from '../css/feature.module.scss';
import sectionStyles from '../css/section.module.scss';
import titleStyles from '../css/title.module.scss';
import pacmanStyles from '../css/pacman.module.scss';

const Title = () => (
	<section
		className={clsx(sectionStyles.section)}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={titleStyles.title}>
				<div className={titleStyles.title__logo}>
					<div className={pacmanStyles.pacman}></div>
					<img src="/img/pages/index/logo.svg" />
				</div>
				<div className={titleStyles.title__title}>
					<h2>APH Games Portal</h2>
				</div>
			</div>
		</div>
	</section>
);

const Feature = () => (
	<section
		className={clsx(sectionStyles.section, sectionStyles['section--odd'])}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={featureStyles.feature}>
				<img
					className={featureStyles.feature__illustration}
					src="/img/pages/index/new_design.svg"
				/>

				<h2 className={featureStyles.feature__title}>Workshops</h2>

				<p className={featureStyles.feature__description}>
					Game industry
				</p>
				<p className={featureStyles.feature__description}>
					Game development
				</p>
				<p className={featureStyles.feature__description}>
					Software engineering
				</p>
			</div>

			<div className={featureStyles.feature}>
				<img
					className={featureStyles.feature__illustration}
					src="/img/pages/index/new_topics.svg"
				/>

				<h2 className={featureStyles.feature__title}>
					Tutorials
				</h2>

				<p className={featureStyles.feature__description}>
					Typescript
				</p>
				<p className={featureStyles.feature__description}>
					PixiJS
				</p>
				<p className={featureStyles.feature__description}>
					Component Architecture
				</p>
				<p className={featureStyles.feature__description}>And much more...</p>
			</div>

			<div className={featureStyles.feature}>
				<img
					className={featureStyles.feature__illustration}
					src="/img/pages/index/new_examples.svg"
				/>

				<h2 className={featureStyles.feature__title}>Minigames</h2>

				<p className={featureStyles.feature__description}>
					Stay tuned! The content is on the way!
				</p>
			</div>
		</div>
	</section>
);

const Home = () => {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout description={siteConfig.customFields.description as string}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<Title />
			<Feature />
		</Layout>
	);
};

export default Home;
