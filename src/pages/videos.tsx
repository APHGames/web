import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import { Redirect } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import layoutStyles from '@site/src/css/layout.module.scss';
import videoStyles from '@site/src/css/videos.module.scss';
import {
	formatVideoDuration,
	VideoItem,
	videoSections,
} from '../internals/videos-data';

const VideoCard = ({
	video,
	isPlaying,
	onPlay,
}: {
	video: VideoItem;
	isPlaying: boolean;
	onPlay: () => void;
}) => (
	<article className={videoStyles.card}>
		<div className={videoStyles.media}>
			{isPlaying ? (
				<iframe
					src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
					title={video.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			) : (
				<button
					type="button"
					className={videoStyles.thumbButton}
					onClick={onPlay}
					aria-label={`Přehrát ${video.title}`}
				>
					<img
						src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
						alt=""
					/>
					<span className={videoStyles.playMark} aria-hidden="true" />
					<span className={videoStyles.duration}>{formatVideoDuration(video.duration)}</span>
				</button>
			)}
		</div>
		<div className={videoStyles.body}>
			<h3 className={videoStyles.cardTitle}>{video.title}</h3>
			<p className={videoStyles.cardText}>{video.description}</p>
			<a
				className={videoStyles.youtubeLink}
				href={`https://www.youtube.com/watch?v=${video.id}`}
				target="_blank"
				rel="noreferrer noopener"
			>
				Otevřít na YouTube
			</a>
		</div>
	</article>
);

const VideosPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const { currentLocale, youtube } = siteConfig.customFields;
	const [playingId, setPlayingId] = useState<string | null>(null);

	if (currentLocale !== 'cs') {
		return <Redirect to="/" />;
	}

	return (
		<Layout description="Videa z YouTube kanálu APHGames" title="Videa">
			<DocusaurusHead>
				<link rel="canonical" href={`${siteConfig.url}/videos`} />
			</DocusaurusHead>
			<div className={layoutStyles.page}>
				<section className={clsx(layoutStyles.section, videoStyles.introSection)}>
					<div className={layoutStyles.sectionInner}>
						<span className={layoutStyles.sectionLabel}>YouTube</span>
						<h1 className={layoutStyles.sectionHeading}>Videa</h1>
						<div className={layoutStyles.aboutGrid} data-stack="true">
							<div className={layoutStyles.aboutPanel}>
								<p>
									Kompletní katalog videí z kanálu
									{' '}
									<a href={youtube as string} target="_blank" rel="noreferrer noopener">APH Games</a>
									. Přednášky, tutoriály k příkladům, seriál o hráčkách, art klipy a záznamy z jamů.
								</p>
								<nav className={videoStyles.subnav} aria-label="Kategorie videí">
									{videoSections.map((section) => (
										<a key={section.id} className={videoStyles.subnavLink} href={`#${section.id}`}>
											{section.title}
										</a>
									))}
								</nav>
							</div>
						</div>
					</div>
				</section>
				{videoSections.map((section) => (
					<section key={section.id} id={section.id} className={clsx(layoutStyles.section, videoStyles.anchorSection)}>
						<div className={layoutStyles.sectionInner}>
							<span className={layoutStyles.sectionLabel}>{section.title}</span>
							<h2 className={layoutStyles.sectionHeading}>{section.title}</h2>
							<p className={videoStyles.sectionIntro}>{section.intro}</p>
							<div className={videoStyles.grid}>
								{section.videos.map((video) => (
									<VideoCard
										key={video.id}
										video={video}
										isPlaying={playingId === video.id}
										onPlay={() => setPlayingId(video.id)}
									/>
								))}
							</div>
						</div>
					</section>
				))}
			</div>
		</Layout>
	);
};

export default VideosPage;
