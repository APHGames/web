import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import sectionStyles from '@site/src/css/section.module.scss';
import slidesStyles from '@site/src/css/slides.module.scss';

import SLIDES_DATA from '../../static/slides/slides-info.json';

const Slides = () => {
	const context = useDocusaurusContext();
	const currentLocale = context.siteConfig.customFields.currentLocale;

	// for now, CS will use CS tutorials and EN slides for other categories, as they haven't been translated yet
	const availableSlides = SLIDES_DATA.filter(sl => (currentLocale === 'cs' && sl.category !== 'Tutorial') || (sl.locale === currentLocale))
	const slidesGroups = [...new Set(SLIDES_DATA.map(s => s.group))];

	return (
		<>
			{
				slidesGroups.map((group: string) => {
					const slideGroup = availableSlides.filter((sl) => sl.group === group);
					return (slideGroup.length !== 0) && (
						<section key={`ssection_${group}`}>
							<h3 className={clsx(sectionStyles.section__title, slidesStyles.slides__title, 'text--center')}>
								{group}
							</h3>
							<div className={slidesStyles['slides--group']}>
								<div className={slidesStyles.slides__group}>
									{
										slideGroup.map((slides, idx) => (
											<div key={idx} className={slidesStyles.input_container}>
												<a className={slidesStyles.link_button} id={slides.file_name} href={`/slides/${slides.file_name}.html`} />
												<div className={slidesStyles.link_tile}>
													<a className={slidesStyles.inner_container} href={`/slides/${slides.file_name}.html?print-pdf`}>
														<img src="/img/pages/index/ic_print.svg" />
													</a>
													<a className={slidesStyles.inner_container} href={`/slides/${slides.file_name}.html?presentation`}>
														<img src="/img/pages/index/ic_presentation.svg" />
													</a>
													<div className={slidesStyles.inner_hint}>{slides.category}</div>
													<div className={slidesStyles.icon}>
														<img src={`/slides/icons/${slides.file_name}.svg`} />
													</div>
													<label
														className={slidesStyles.link_tile_label}
														htmlFor={slides.file_name}
													>
														{slides.name}
													</label>
												</div>
											</div>
										))
									}
								</div>
							</div>
						</section>
					);
				})
			}
		</>
	)
};


export default (props) => {
	if (typeof (window) !== 'undefined') {
		return <Slides />;
	}
	return null;
};
