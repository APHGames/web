import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import Layout from '@theme/Layout';
import galleryStyles from '@site/src/css/gallery.module.scss';
import { translate } from '@docusaurus/Translate';
import { galleryData } from '../internals/gallery-data';

const Games = ({ galleryUrl }: { galleryUrl: string }) => (
	<>
		<h2 className={clsx(galleryStyles.section__title, galleryStyles.games__title, 'text--center')}>{translate({ message: 'gallery.title' })}</h2>
		{
			galleryData.map((galleryGroup) => (
				<section
					key={`ssection_${galleryGroup.name}`}
					className={clsx(galleryStyles.section)}
				>
					<h2
						className={clsx(galleryStyles.section__title, galleryStyles.games__title, 'text--center')}
					>
						{galleryGroup.name}
					</h2>
					<div key={`inner_${galleryData.indexOf(galleryGroup)}`} className={galleryStyles.games__group}>
						{galleryGroup.items && galleryGroup.items.map((item) => (
							<div key={`${item.id}`} className={galleryStyles.input_container}>
								<a className={galleryStyles.link_button} id={item.id} href={`${galleryUrl}/${item.id}/`}>
									<div className={galleryStyles.link_tile}>
										<div className={galleryStyles.techicon}>
											{item.tech === 'PixiJS' && <img className={galleryStyles.techicon_bigger} src="/img/pages/index/ic_colfio.png" />}
											{item.tech === 'Godot' && <img src="/img/pages/index/ic_godot.svg" />}
											{item.tech === 'Unity' && <img src="/img/pages/index/ic_unity.svg" />}
										</div>
										{item.sourceLink && (
											<a className={galleryStyles.inner_container} href={item.sourceLink}>
												<img src="/img/global/github.svg" />
											</a>
										)}
										<div className={galleryStyles.icon}>
											<img src={`${galleryUrl}/${item.id}/screenshot.jpg`} />
										</div>
										<div className={galleryStyles.link_tile_label}>
											{item.name}
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				</section>
			))
		}
	</>
);

const GamesPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const title = 'APH';
	const context = useDocusaurusContext();
	const url = context.siteConfig.customFields.url as string;
	const protEndIndex = url.indexOf('//');
	const galleryUrl = `${url.substring(0, protEndIndex + 2)}gallery.${url.substring(protEndIndex + 2)}`;

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
