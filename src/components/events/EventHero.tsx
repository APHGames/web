import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import { EventKind } from '@site/src/internals/events/types';
import styles from './EventHero.module.scss';

const GH = '/img/pages/events/gamehack/parallax';
const GJ = '/img/pages/events/gamejam/parallax';

type Layer = {
	image: string;
	translateY?: [number, number];
	style: React.CSSProperties;
	shouldAlwaysCompleteAnimation?: boolean;
	expanded: boolean;
	disabled?: boolean;
};

const contain = (position: string): React.CSSProperties => ({
	backgroundSize: 'contain',
	backgroundPosition: position,
	backgroundRepeat: 'no-repeat',
});

const desktopLayers = (base: string, extra?: Layer[]): Layer[] => [
	{
		image: `${base}/bgr7.png`,
		translateY: [0, 0],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		image: `${base}/bgr6.png`,
		translateY: [40, 0],
		style: contain('bottom center'),
		expanded: false,
	},
	{
		image: `${base}/bgr5.png`,
		translateY: [15, 0],
		style: contain('bottom right'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		image: `${base}/bgr4.png`,
		translateY: [12, 0],
		style: contain('top left'),
		expanded: false,
	},
	{
		image: `${base}/bgr4x.png`,
		translateY: [15, 0],
		style: contain('top right'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		image: `${base}/bgr3.png`,
		translateY: [20, 0],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	...(extra ?? []),
	{
		image: `${base}/bgr1.png`,
		translateY: [0, 110],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		image: `${base}/bgr1x.png`,
		translateY: [5, 150],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
];

const mobileLayers = (base: string): Layer[] => [
	{
		image: `${base}/mobile.png`,
		style: {
			backgroundSize: 'cover',
			backgroundPosition: 'bottom center',
			backgroundRepeat: 'no-repeat',
		},
		expanded: false,
		disabled: true,
	},
	{
		image: `${base}/bgr1.png`,
		translateY: [0, 110],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		image: `${base}/bgr1x.png`,
		translateY: [5, 150],
		style: contain('bottom center'),
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
];

const layersFor = (kind: EventKind, isMobile: boolean): Layer[] => {
	const base = kind === 'gamehack' ? GH : GJ;
	if (isMobile) {
		return mobileLayers(base);
	}
	const extra = kind === 'gamejam'
		? [{
			image: `${GJ}/bgr2.png`,
			translateY: [-10, -110] as [number, number],
			style: contain('bottom center'),
			shouldAlwaysCompleteAnimation: true,
			expanded: false,
		}]
		: undefined;
	return desktopLayers(base, extra);
};

const EventHero = ({ title, variant }: { title: string; variant: EventKind }) => {
	const [mounted, setMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setMounted(ExecutionEnvironment.canUseDOM);
		if (!ExecutionEnvironment.canUseDOM) {
			return undefined;
		}
		const media = window.matchMedia('(max-width: 996px)');
		const update = () => setIsMobile(media.matches);
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	}, []);

	return (
		<section className={styles.hero}>
			{mounted ? (
				<ParallaxProvider>
					<ParallaxBanner
						className={clsx(styles.banner, variant === 'gamehack' ? styles.gamehack : styles.gamejam)}
						layers={layersFor(variant, isMobile)}
					/>
				</ParallaxProvider>
			) : (
				<div className={clsx(styles.bannerFallback, variant === 'gamehack' ? styles.gamehack : styles.gamejam)} />
			)}
			<div className={styles.titleBar}>
				<h1 className={styles.title}>{title}</h1>
			</div>
		</section>
	);
};

export default EventHero;
