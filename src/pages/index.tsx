import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useState } from 'react';

import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import Loadable from 'react-loadable';
import homeStyles from '@site/src/css/home.module.scss';
import LoadingSpinner from '../components/Loading';
import HeroParallax from '../components/HeroParallax';
import ColfioLogo from '../../static/img/pages/index/colfio.png';

type FeatureItem = {
	href: string;
	image: string;
	title: string;
	hint: string;
	external?: boolean;
};

const Feature = () => {
	const context = useDocusaurusContext();
	const { currentLocale, youtube } = context.siteConfig.customFields;

	const items: FeatureItem[] = [
		{
			href: './docs/learning/intro',
			image: '/img/pages/index/lectures.jpg',
			title: translate({ message: 'index.workshops' }),
			hint: translate({ message: 'index.hint.learn' }),
		},
		...(currentLocale === 'cs'
			? [{
				href: youtube as string,
				image: '/img/pages/index/videos.jpg',
				title: translate({ message: 'index.videos' }),
				hint: translate({ message: 'index.hint.watch' }),
				external: true,
			}]
			: []),
		{
			href: './docs/learning/intro',
			image: '/img/pages/index/tutorials.jpg',
			title: translate({ message: 'index.tutorials' }),
			hint: translate({ message: 'index.hint.build' }),
		},
		{
			href: './gallery',
			image: '/img/pages/index/games.jpg',
			title: translate({ message: 'index.minigames' }),
			hint: translate({ message: 'index.hint.play' }),
		},
	];

	return (
		<section className={clsx(homeStyles.section, homeStyles.featureSection)}>
			<div className={homeStyles.sectionInner}>
				<span className={homeStyles.sectionLabel}>{translate({ message: 'index.explore' })}</span>
				<div className={homeStyles.featureGrid} data-count={items.length}>
					{items.map((item) => (
						<a
							key={item.title}
							className={homeStyles.featureTile}
							href={item.href}
							{...(item.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
						>
							<img className={homeStyles.featureImage} src={item.image} alt="" />
							<span className={homeStyles.featureOverlay} />
							<span className={homeStyles.featureShine} />
							<span className={homeStyles.featureBody}>
								<h2 className={homeStyles.featureTitle}>{item.title}</h2>
								<p className={homeStyles.featureHint}>{item.hint}</p>
							</span>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

const Colfio = () => {
	const text = translate({ message: 'index.colfio' })
		.replace('#COLFIO', '<a href="https://colf.io">COLF.IO</a>')
		.replace('#PIXI', '<a href="https://pixijs.com">PixiJS</a>');

	return (
		<section className={clsx(homeStyles.section, homeStyles.colfio)}>
			<div className={homeStyles.sectionInner}>
				<span className={homeStyles.sectionLabel}>{translate({ message: 'index.engine' })}</span>
				<div className={homeStyles.colfioBanner}>
					<img className={homeStyles.colfioLogo} src={ColfioLogo} alt="COLF.IO" />
					<p className={homeStyles.colfioText} dangerouslySetInnerHTML={{ __html: text }} />
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
			const converted = Array(data.length).fill(0, 0, data.length).map((_, idx) => data[idx]);
			setNewsData(converted);
		};
		fetchData();
	}, [currentLocale]);

	if (!newsData) {
		return null;
	}

	return (
		<section className={clsx(homeStyles.section, homeStyles.news)}>
			<div className={homeStyles.sectionInner}>
				<h2 className={homeStyles.sectionHeading}>{translate({ message: 'index.news' })}</h2>
				<div className={homeStyles.newsList}>
					{newsData.map((dt) => (
						<article className={homeStyles.newsItem} key={dt.date}>
							<div className={homeStyles.newsDate}>{dt.date}</div>
							<div className={homeStyles.newsText} dangerouslySetInnerHTML={{ __html: dt.text }} />
						</article>
					))}
				</div>
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
				<div className={homeStyles.page}>
					<HeroParallax />
					<Feature />
					<AboutComponent />
					<Colfio />
					<News />
				</div>
			</Layout>
		</>
	);
};

export default Home;
