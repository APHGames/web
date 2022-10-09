import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import Layout from '@theme/Layout';
import { translate } from "@docusaurus/Translate";

import featureStyles from '../css/feature.module.scss';
import sectionStyles from '../css/section.module.scss';
import titleStyles from '../css/title.module.scss';
import pacmanStyles from '../css/pacman.module.scss';
import contentStyles from '../css/content.module.scss';
import { newsDataCs, newsDataEn } from '../internals/news';
import Logo from '../../static/img/pages/index/logo.svg';

const Title = () => (
	<section
		className={clsx(sectionStyles.section)}
	>
		<div className={clsx(sectionStyles['section--inner'], titleStyles.title__section)}>
			<div className={titleStyles.title}>
				<div className={titleStyles.title__logo}>
					<Logo className={titleStyles.svgGlow} />
					<div className={pacmanStyles.pacman}></div>
				</div>
				<div className={titleStyles.title__title}>
					<h2>{translate({ message: 'index.title' })}</h2>
				</div>
			</div>
		</div>
	</section>
);

const Feature = () => (
	<section
		className={clsx(sectionStyles.section)}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={featureStyles.feature}>
				<div>
					<img
						className={featureStyles.feature__illustration}
						src="/img/pages/index/new_design.svg"
					/>
				</div>

				<h2 className={featureStyles.feature__title}>{translate({ message: 'index.workshops' })}</h2>
			</div>

			<div className={featureStyles.feature}>
				<div>
					<img
						className={featureStyles.feature__illustration}
						src="/img/pages/index/new_topics.svg"
					/>
				</div>
				<h2 className={featureStyles.feature__title}>
					{translate({ message: 'index.tutorials' })}
				</h2>
			</div>

			<div className={featureStyles.feature}>
				<div>
					<img
						className={featureStyles.feature__illustration}
						src="/img/pages/index/new_examples.svg"
					/>
				</div>

				<h2 className={featureStyles.feature__title}>{translate({ message: 'index.minigames' })}</h2>
			</div>
		</div>
	</section>
);

const AboutCs = () => (
	<section
		className={clsx(sectionStyles.section, sectionStyles['section'])}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={clsx(contentStyles['content__col2m'], contentStyles['content__text'])}>
				<div>
					<h3>Co je cílem?</h3>
					<ul>
						<li>Poskytnout ucelené materiály týkající se vývoje her se zaměřením na uměleckou a low-code technickou stránku - žádné enginy, žádná zdlouhavá instalace - stačí jen nainstalovat NodeJS, stáhnout příkládky a prohlédnout si kód, jak se co dělá.</li>
						<li>Vzdělávat lidi napříč všemi věkovými kategorii i technickým backgroundem v oblasti herního vývoje.</li>
						<li>Sdílet studentské práce z kurzů spojených s APH Games.</li>
					</ul>
				</div>
				<div>
					<h3>Jak vznikl APH Games?</h3>
					<p>APH Games původně vznikl jako samostatný předmět na Fakultě informačních technologií ČVUT pod kódem APH (Architektura Počítačových Her). Původně se jednalo o čistě technický předmět, který se zaměřoval na architekturu herních enginů s praktickými ukázkami v C++. Postupem času se jeho záběr rozšířil do oblasti designu, umění, storytellingu, a mnohých dalších. Místo C++ se začal využívat TypeScript pro snadnou demonstraci ukázkových příkladů přímo na webu.</p>
					<p>Dnes je APH Games separátní brand s vlastním webem a Youtube kanálem, jehož cílem je sdílet zajímavé poznatky ze všech různých koutů herního průmyslu.</p>
				</div>
			</div>
		</div>
	</section>
);

const AboutEn = () => (
	<section
		className={clsx(sectionStyles.section, sectionStyles['section'])}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={clsx(contentStyles['content__col2m'], contentStyles['content__text'])}>
				<div>
					<h3>What is the main goal?</h3>
					<ul>
						<li>To provide materials about game development, with a strong focus on art and low-code technical side - no engines, no cumbersome installation, just download NodeJS and the examples and look through the code to figure out how things are done.</li>
						<li>To educate people across all backgrounds in the scope of game development.</li>
						<li>To share student projects from courses held by APH Games.</li>
					</ul>
				</div>
				<div>
					<h3>How APH Games was made?</h3>
					<p>Originally, APH Games was a course at FIT CTU in Prague. It was a solely technical subject, focusing on the architecture of game engines with practical examples in C++ language. Gradually, its scope has expanded into design, art, storytelling, and many others. C++ was replaced by TypeScript for the sake of simpler examples showcasing directly on the web.</p>
					<p>Today, APH Games is a separate brand with its own web. Its goal is to share interesting insights from all fields of game industry.</p>
				</div>
			</div>
		</div>
	</section>
);

const News = () => {
	const context = useDocusaurusContext();
	const currentLocale = context.siteConfig.customFields.currentLocale;
	const data = currentLocale === 'cs' ? newsDataCs : newsDataEn;
	const title = currentLocale === 'cs' ? 'Novinky' : 'News';
	return (<section
		className={clsx(sectionStyles.section)}
	>
		<h2 className={contentStyles.content__title}>{title}</h2>
		<div className={contentStyles.content__list}>
			{data.map(dt => (<div key={dt.date}>
				<div className={contentStyles.list_title}>{dt.date}</div>
				<div className={contentStyles.list_text}>{dt.text}</div>
			</div>)
			)}
		</div>
	</section>);
};

const Home = () => {
	const { siteConfig } = useDocusaurusContext();
	const context = useDocusaurusContext();
	const currentLocale = context.siteConfig.customFields.currentLocale;

	return (
		<Layout description={siteConfig.customFields.description as string}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<Title />
			<Feature />
			{currentLocale === 'cs' && <AboutCs />}
			{currentLocale === 'en' && <AboutEn />}
			<News />
		</Layout>
	);
};

export default Home;
