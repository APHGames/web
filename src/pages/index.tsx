import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useState } from 'react';

import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import Loadable from 'react-loadable';
import featureStyles from '@site/src/css/feature.module.scss';
import sectionStyles from '@site/src/css/section.module.scss';
import titleStyles from '@site/src/css/title.module.scss';
import pacmanStyles from '@site/src/css/pacman.module.scss';
import contentStyles from '@site/src/css/content.module.scss';
import LoadingSpinner from '../components/Loading';
import Logo from '../../static/img/pages/index/logo.svg';
import ColfioLogo from '../../static/img/pages/index/colfio.png';

const Title = () => (
	<section
		className={clsx(sectionStyles.section)}
	>
		<div className={clsx(sectionStyles['section--inner'], titleStyles.title__section)}>
			<div className={titleStyles.title}>
				<div className={titleStyles.title__logo}>
					<Logo className={titleStyles.svgGlow} />
					<div className={pacmanStyles.pacman} />
				</div>
				<div className={titleStyles.title__title}>
					<h2>{translate({ message: 'index.title' })}</h2>
				</div>
			</div>
		</div>
	</section>
);

const Feature = () => {
	const context = useDocusaurusContext();
	const { currentLocale, youtube } = context.siteConfig.customFields;

	return (
		<section
			className={clsx(sectionStyles.section)}
		>
			<div className={clsx(sectionStyles['section--inner'], sectionStyles['section--littlepadding'])}>
				<div className={sectionStyles.section__innervertical}>
					<div className={sectionStyles.section__innerflex}>
						<div className={featureStyles.feature}>
							<a href="./docs/learning/intro">
								<div>
									<img
										className={featureStyles.feature__illustration}
										src="/img/pages/index/lectures.jpg"
									/>
								</div>

								<h2 className={featureStyles.feature__title}>{translate({ message: 'index.workshops' })}</h2>
							</a>
						</div>
						{currentLocale === 'cs' && (
							<>
								<div className={featureStyles.feature}>
									<a href={youtube as any}>
										<div>
											<img
												className={featureStyles.feature__illustration}
												src="/img/pages/index/videos.jpg"
											/>
										</div>
										<h2 className={featureStyles.feature__title}>
											{translate({ message: 'index.videos' })}
										</h2>
									</a>
								</div>
							</>
						)}
						<div className={featureStyles.feature}>
							<a href="./docs/learning/intro">
								<div>
									<img
										className={featureStyles.feature__illustration}
										src="/img/pages/index/tutorials.jpg"
									/>
								</div>
								<h2 className={featureStyles.feature__title}>
									{translate({ message: 'index.tutorials' })}
								</h2>
							</a>
						</div>
						<div className={featureStyles.feature}>
							<a href="./gallery">
								<div>
									<img
										className={featureStyles.feature__illustration}
										src="/img/pages/index/games.jpg"
									/>
								</div>

								<h2 className={featureStyles.feature__title}>{translate({ message: 'index.minigames' })}</h2>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const Colfio = () => {
	// TODO perhaps move this component into a i18n folder completely, as Docusaurus doesn't support links inside the JSON file
	const text = translate({ message: 'index.colfio' }).replace('#COLFIO', '<a href="https://colf.io">COLF.IO</a>').replace('#PIXI', '<a href="https://pixijs.com">PixiJS</a>');
	return (
		<section
			className={clsx(sectionStyles.section)}
		>
			<div className={clsx(contentStyles.content__vertical, titleStyles.title__colfio)}>
				<div>
					<img src={ColfioLogo} />
				</div>
				<div>
					<p dangerouslySetInnerHTML={{ __html: text }} />
				</div>
			</div>
		</section>
	);
};

const News = () => {
	const context = useDocusaurusContext();
	const { currentLocale } = context.siteConfig.customFields;

	const [newsData, setNewsData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await import(`../../i18n/${currentLocale}/news.json`);
			// TODO doesn't serialize into array out of the box
			const converted = Array(data.length).fill(0, 0, data.length).map((_, idx) => data[idx]);
			setNewsData(converted);
		};
		fetchData();
	}, []);
	return newsData && (
		<section
			className={clsx(sectionStyles.section)}
		>
			<h2 className={contentStyles.content__title}>{translate({ message: 'index.news' })}</h2>
			<div className={contentStyles.content__list}>
				{newsData.map((dt) => (
					<div key={dt.date}>
						<div className={contentStyles.list_title}>{dt.date}</div>
						<div className={contentStyles.list_text} dangerouslySetInnerHTML={{ __html: dt.text }} />
					</div>
				))}
			</div>
		</section>
	);
};

const Home = () => {
	const { siteConfig } = useDocusaurusContext();
	const context = useDocusaurusContext();
	const { currentLocale } = context.siteConfig.customFields;
	const AboutComponent = Loadable({
		loader: () => import(`../../i18n/${currentLocale}/components/About.tsx`),
		loading: LoadingSpinner,
	});

	return (
		<>
			<Layout description={siteConfig.customFields.description as string}>
				<DocusaurusHead>
					<link rel="canonical" href={siteConfig.url} />
				</DocusaurusHead>
				<Title />
				<Feature />
				<AboutComponent />
				<Colfio />
				<News />
			</Layout>
		</>
	);
};

export default Home;
