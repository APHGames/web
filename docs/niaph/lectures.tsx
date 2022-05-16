import React from 'react';
import clsx from 'clsx';
import { slidesData, SlideSection, Slide } from '@site/src/internals/pages-data';
import sectionStyles from '@site/src/css/section.module.scss';
import slidesStyles from '@site/src/css/slides.module.scss';

const Slides = () => (
	<>
		{
			slidesData.map((slideSect: SlideSection) => {
				const groupedSlides = slideSect.slides.reduce(
					(entryMap, e) => entryMap.set(
						e.group, [...entryMap.get(e.group) || [], e],
					), new Map<number, Slide[]>(),
				);
				return (
					<section
						key={`ssection_${slideSect.name}`}
					>
						<h3
							className={clsx(sectionStyles.section__title, slidesStyles.slides__title, 'text--center')}
						>
							{slideSect.name}
						</h3>
						{
							Array.from(groupedSlides.keys()).map((groupId) => (
								<div key={`inner_${groupId}`} className={slidesStyles['slides--group']}>
									<div className={slidesStyles.slides__group}>
										{
											groupedSlides.get(groupId)?.map((slide) => (
												<div key={`${groupId}_${slide.id}`} className={slidesStyles.input_container}>
													{slide.desc
														&& (
															<>
																<a className={slidesStyles.link_button} id={slide.id} href={`/slides/${slide.id}.html`} />
																<div className={slidesStyles.link_tile}>
																	<a className={slidesStyles.inner_container} href={`/slides/${slide.id}.html?print-pdf`}>
																		<img src="/img/pages/index/ic_print.svg" />
																	</a>
																	<a className={slidesStyles.inner_container} href={`/slides/${slide.id}.html?presentation`}>
																		<img src="/img/pages/index/ic_presentation.svg" />
																	</a>
																	<div className={slidesStyles.inner_hint}>{slide.hint}</div>
																	<div className={slidesStyles.icon}>
																		<img src={`/slides/icons/${slide.id}.svg`} />
																	</div>
																	<label
																		className={slidesStyles.link_tile_label}
																		htmlFor={slide.id}
																	>
																		{slide.desc}
																	</label>
																</div>
															</>
														)}
													{!slide.desc
														&& (
															<div className={slidesStyles.link_tile}>
																<div className={slidesStyles.icon}>
																	<img src="/img/pages/index/ic_lock.svg" />
																	<p className={slidesStyles.link_date}>{slide.date}</p>
																</div>
															</div>
														)}
												</div>
											))
										}
									</div>
								</div>
							))
						}
					</section>
				);
			})
		}
	</>
);


export default (props) => {
	if (typeof (window) !== 'undefined') {
		return <Slides  />;
	}
	return null;
};
