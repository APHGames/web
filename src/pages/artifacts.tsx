/* eslint-disable no-restricted-syntax */
import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import Layout from '@theme/Layout';
import artifacts from '../../static/tiscali.json';
import sectionStyles from '../css/section.module.scss';
import artifactsStyles from '../css/artifacts.module.scss';

const comparer = (a: any, b: any) => parseInt(b) - parseInt(a);

const Artifacts = () => {
	const years = Object.keys(artifacts).sort(comparer);

	return (
		<>
			{
				years.map((year) => {
					const yearData = artifacts[year];
					return (
						<section
							key={`year_${year}`}
							className={clsx(sectionStyles.section)}
						>
							<h3
								className={clsx(sectionStyles.section__title, artifactsStyles.artifacts__year, 'text--center')}
							>
								{year}
							</h3>
							<div className={artifactsStyles.artifacts__container}>
								{Object.keys(yearData).sort(comparer).map((month) => {
									const monthData = yearData[month];
									return Object.keys(monthData).sort(comparer).map((day) => {
										const dayData = monthData[day];
										return dayData.map((data) => {
											const date = `${day}.${month}. ${year}`;
											return (
												<a href={data.link}>
													<div className={artifactsStyles.artifacts__item}>
														<div className={artifactsStyles.artifacts__date}>{date}</div>
														<div className={artifactsStyles.artifacts__link}>{data.text}</div>
													</div>
												</a>
											);
										});
									});
								})}
							</div>
						</section>
					);
				})
			}
		</>
	);
};

const ArtifactsPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const total = React.useMemo(() => {
		let totalNum = 0;
		for (const key of Object.keys(artifacts)) {
			for (const key2 of Object.keys(artifacts[key])) {
				for (const key3 of Object.keys(artifacts[key][key2])) {
					totalNum += artifacts[key][key2][key3].length;
				}
			}
		}
		return totalNum;
	}, []);

	return (
		<Layout description={siteConfig.customFields.description as string} title="Artefakty">
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>

			<section className={clsx(sectionStyles.section, artifactsStyles.artifacts__title)}>
				<h3>
					Zde se nachází velmi velmi pracně odfiltrovaný seznam článků z
					<a href="https://games.tiscali.cz">games.tiscali</a>
					. Z celkových cca 60 000 jich tu máme celkem
					{total}
					{' '}
					a je možno z nich vyčíst průřez celou herní historií od roku 2000 včetně české subkultury.
				</h3>
			</section>
			<Artifacts />
		</Layout>
	);
};

export default ArtifactsPage;
