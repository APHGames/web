import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import Layout from '@theme/Layout';

import { ResourceSection, resourcesData } from '../internals/resources-data';

import sectionStyles from '../css/section.module.scss';
import resourceStyles from '../css/resources.module.scss';

const Resources = () => (
	<>
		{
			resourcesData.map((rSection: ResourceSection) => (
				<section
					key={`resources_${rSection.name}`}
					className={clsx(sectionStyles.section)}
				>
					<h3
						className={clsx(sectionStyles.section__title, resourceStyles.resources__title, 'text--center')}
					>
						{rSection.name}
					</h3>
					{
						<div key={`${rSection.name}`} className={resourceStyles['resources--group']}>
							<div className={resourceStyles.resources__group}>
								{rSection.resources.map((resource, idx) => (
									<a href={resource.link}>
										<div className={resourceStyles.resource__container}>
											<div className={resourceStyles.icon}>
												<img src={`/img/pages/resources/${resource.icon}`} />
											</div>
											<div className={resourceStyles.content}>
												<h3>{resource.title}</h3>
												{resource.subTitle && <h4>{resource.subTitle}</h4>}
												{resource.description && <p>{resource.description}</p>}
												{resource.link && resource.linkDesc && <p>{resource.link}</p>}

											</div>
										</div>
									</a>
								))}
							</div>
						</div>
					}
				</section>
			))
		}
	</>
);

const ResourcesPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const title = 'APH';

	return (
		<Layout description={siteConfig.customFields.description as string} title={title}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<Resources />
		</Layout>
	);
};

export default ResourcesPage;
