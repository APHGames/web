import React, { useEffect, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';

import pacmanStyles from '@site/src/css/pacman.module.scss';
import Logo from '../../../static/img/pages/index/logo.svg';
import styles from './HeroParallax.module.scss';

const LogoMark = () => (
	<div className={styles.logoLayer}>
		<div className={styles.logoWrap}>
			<Logo className={styles.logo} />
			<div className={pacmanStyles.pacman} />
		</div>
	</div>
);

const Atmosphere = () => (
	<div className={styles.atmosphere} aria-hidden>
		<span className={styles.glow} data-tone="center" />
		<span className={styles.glow} data-tone="left" />
		<span className={styles.glow} data-tone="right" />
		<span className={styles.glow} data-tone="top" />
		<span className={styles.grid} />
	</div>
);

const LeftForms = () => (
	<div className={styles.formsLeft} aria-hidden>
		<span className={styles.col} data-variant="far" />
		<span className={styles.col} data-variant="tall" />
		<span className={styles.col} data-variant="mid" />
		<span className={styles.col} data-variant="short" />
		<span className={styles.col} data-variant="stub" />
		<span className={styles.blade} data-variant="a" />
		<span className={styles.blade} data-variant="b" />
		<span className={styles.blade} data-variant="c" />
		<span className={styles.fin} data-side="left" />
		<span className={styles.spike} data-side="left" />
	</div>
);

const RightForms = () => (
	<div className={styles.formsRight} aria-hidden>
		<span className={styles.panel} data-variant="back" />
		<span className={styles.panel} data-variant="mid" />
		<span className={styles.panel} data-variant="front" />
		<span className={styles.panel} data-variant="thin" />
		<span className={styles.wedge} data-variant="main" />
		<span className={styles.wedge} data-variant="side" />
		<span className={styles.fin} data-side="right" />
		<span className={styles.spike} data-side="right" />
	</div>
);

const MidAccents = () => (
	<div className={styles.formsMid} aria-hidden>
		<span className={styles.shard} data-variant="a" />
		<span className={styles.shard} data-variant="b" />
		<span className={styles.shard} data-variant="c" />
		<span className={styles.shard} data-variant="d" />
		<span className={styles.ring} data-side="left" />
		<span className={styles.ring} data-side="right" />
		<span className={styles.dot} data-variant="a" />
		<span className={styles.dot} data-variant="b" />
		<span className={styles.dot} data-variant="c" />
		<span className={styles.dot} data-variant="d" />
	</div>
);

const BaseForms = () => (
	<div className={styles.formsBase} aria-hidden>
		<span className={styles.ridge} data-side="left" />
		<span className={styles.ridge} data-side="center" />
		<span className={styles.ridge} data-side="right" />
		<span className={styles.step} data-side="left" />
		<span className={styles.step} data-side="right" />
	</div>
);

const layers = () => [
	{
		children: <Atmosphere />,
		translateY: [0, -55],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		children: <LeftForms />,
		translateY: [8, 75],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		children: <RightForms />,
		translateY: [5, 85],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		children: <MidAccents />,
		translateY: [-8, -95],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		children: <BaseForms />,
		translateY: [0, 60],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
	{
		children: <LogoMark />,
		translateY: [0, 45],
		shouldAlwaysCompleteAnimation: true,
		expanded: false,
	},
];

const HeroParallax = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(ExecutionEnvironment.canUseDOM);
	}, []);

	return (
		<section className={styles.hero}>
			{mounted ? (
				<ParallaxProvider>
					<ParallaxBanner className={styles.banner} layers={layers()} />
				</ParallaxProvider>
			) : (
				<div className={styles.bannerFallback}>
					<LogoMark />
				</div>
			)}
			<div className={styles.titleBar}>
				<h2 className={styles.title}>{translate({ message: 'index.title' })}</h2>
			</div>
		</section>
	);
};

export default HeroParallax;
