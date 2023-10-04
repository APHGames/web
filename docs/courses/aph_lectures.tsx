import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import slidesStyles from '@site/src/css/slides.module.scss';

import SLIDES_DATA from '../../static/slides/slides-info.json';

const Slides = () => {
	const context = useDocusaurusContext();
	const { currentLocale } = context.siteConfig.customFields;

	// for now, CS will use CS tutorials and EN slides for other categories, as they haven't been translated yet
	const availableSlides = SLIDES_DATA.filter((sl) => (currentLocale === sl.locale && sl.course === 'APH'));
	const slidesGroups = [...new Set(SLIDES_DATA.map((s) => s.group))];

	return (
		<>
			{
				slidesGroups.map((group: string) => {
					const slideGroup = availableSlides.filter((sl) => sl.group === group);
					return (slideGroup.length !== 0) && (
						<section key={`ssection_${group}`}>
							<h2 className={clsx(slidesStyles.slides__title, 'text--center')}>
								{group}
							</h2>
							<div className={slidesStyles['slides--group']}>
								<div className={slidesStyles.slides__group}>
									{
										slideGroup.map((slides, idx) => {
											// todo boolean is delivered as a string
											if (slides.locked !== 'true') {
												return (
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
												);
											}
											return (
												<div key={idx} className={slidesStyles.input_container}>
													<div className={slidesStyles.link_tile}>
														<div className={slidesStyles.inner_hint}>{slides.category}</div>
														<div className={slidesStyles.icon}>
															<img src="/img/pages/index/ic_lock.svg" />
														</div>
														<label
															className={slidesStyles.link_tile_label}
															htmlFor={slides.file_name}
														>
															{slides.name}
														</label>
													</div>
												</div>
											);
										})
									}
								</div>
							</div>
						</section>
					);
				})
			}
		</>
	);
};

// SSR check
export default () => {
	if (typeof (window) !== 'undefined') {
		return <Slides />;
	}
	return null;
};
