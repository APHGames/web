import clsx from 'clsx';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ResourceSection, resourcesData } from '@site/src/internals/resources-data';
import sectionStyles from '@site/src/css/section.module.scss';
import resourceStyles from '@site/src/css/resources.module.scss';

const Resources = () => {
	const context = useDocusaurusContext();
	const { currentLocale } = context.siteConfig.customFields;

	return (
		<>
			{
				resourcesData.map((rSection: ResourceSection) => (
					<section
						key={`resources_${rSection.name}`}
					>
						<h3
							className={clsx(sectionStyles.section__title, resourceStyles.resources__title, 'text--center')}
						>
							{rSection.name}
						</h3>
						<div key={`${rSection.name}`} className={resourceStyles['resources--group']}>
							<div className={resourceStyles.resources__group}>
								{rSection.resources.filter((res) => !res.locale || res.locale === currentLocale).map((resource) => (
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
					</section>
				))
			}
		</>
	);
};

// SSR check
export default () => {
	if (typeof (window) !== 'undefined') {
		return <Resources />;
	}
	return null;
};
