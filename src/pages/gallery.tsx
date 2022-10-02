import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import Layout from '@theme/Layout';
import { galleryData } from '../internals/gallery-data';
import galleryStyles from '@site/src/css/gallery.module.scss';

const Games = ({galleryUrl}) => (
	<>
		{
			galleryData.map((galleryGroup) => {
				return (
					<section
						key={`ssection_${galleryGroup.name}`}
						className={clsx(galleryStyles.section)}
					>
						<h2
							className={clsx(galleryStyles.section__title, galleryStyles.games__title, 'text--center')}
						>
							{galleryGroup.name}
						</h2>
						{
							<div key={`inner_${galleryData.indexOf(galleryGroup)}`} className={galleryStyles.games__group}>
								{galleryGroup.items && galleryGroup.items.map((item) => (
									<div key={`${item.id}`} className={galleryStyles.input_container}>
										<a className={galleryStyles.link_button} id={item.id} href={`${galleryUrl}/${item.id}/`} />
										<div className={galleryStyles.link_tile}>
											<div className={galleryStyles.techicon}>
												{item.tech === 'PixiJS' && <img src="/img/pages/index/ic_pixi.svg"/> }
												{item.tech === 'Godot' && <img src="/img/pages/index/ic_godot.svg"/> }
												{item.tech === 'Unity' && <img src="/img/pages/index/ic_unity.svg"/> }
											</div>
											<div className={galleryStyles.icon}>
												<img src={`${galleryUrl}/${item.id}/screenshot.jpg`} />
											</div>
											<label
												className={galleryStyles.link_tile_label}
												htmlFor={item.id}
											>
												{item.name}
											</label>
										</div>
									</div>
								))}
							</div>
						}
					</section>
				);
			})
		}
	</>
);

const GamesPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const title = 'APH';
	const context = useDocusaurusContext();
	console.log(context.siteConfig.customFields);
	const url = context.siteConfig.customFields.url as string;
	const protEndIndex = url.indexOf('//'); 
	const galleryUrl = url.substring(0, protEndIndex + 2) + 'gallery.' + url.substring(protEndIndex + 2);

	return (
		<Layout description={siteConfig.customFields.description as string} title={title}>
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<Games galleryUrl={galleryUrl} />
		</Layout>
	);
};

export default GamesPage;
