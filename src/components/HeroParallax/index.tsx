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
	<div className={styles.field} aria-hidden>
		<span className={styles.glow} data-tone="left" />
		<span className={styles.glow} data-tone="right" />
		<span className={styles.grid} />
	</div>
);

const FarMarks = () => (
	<div className={styles.far} aria-hidden>
		<span className={styles.hair} data-slot="l" />
		<span className={styles.hair} data-slot="r" />
		<span className={styles.tick} data-slot="l" />
		<span className={styles.frame} data-slot="l" />
		<span className={styles.frame} data-slot="r" />
	</div>
);

const MidMarks = () => (
	<div className={styles.mid} aria-hidden>
		<span className={styles.bar} data-slot="l" />
		<span className={styles.diamond} data-slot="l" />
		<span className={styles.ring} data-slot="l" />
		<span className={styles.bar} data-slot="r" />
		<span className={styles.frame} data-slot="r" />
		<span className={styles.diamond} data-slot="r" />
	</div>
);

const Accents = () => (
	<div className={styles.signals} aria-hidden>
		<span className={styles.dot} data-slot="1" />
		<span className={styles.dot} data-slot="2" />
		<span className={styles.pip} data-slot="l" />
		<span className={styles.dot} data-slot="3" />
		<span className={styles.dot} data-slot="4" />
		<span className={styles.pip} data-slot="r" />
	</div>
);

const AnchorLeft = () => (
	<div className={styles.nearLeft} aria-hidden>
		<span className={styles.rail} data-slot="back" />
		<span className={styles.rail} data-slot="front" />
		<span className={styles.rule} />
		<span className={styles.stack} data-slot="1" />
		<span className={styles.stack} data-slot="2" />
		<span className={styles.diamond} />
	</div>
);

const AnchorRight = () => (
	<div className={styles.nearRight} aria-hidden>
		<span className={styles.slab} data-slot="1" />
		<span className={styles.slab} data-slot="2" />
		<span className={styles.slab} data-slot="3" />
		<span className={styles.orbit} />
	</div>
);

const layer = (children: React.ReactNode, translateY: [number, number]) => ({
	children,
	translateY,
	shouldAlwaysCompleteAnimation: true,
	expanded: false,
});

const layers = () => [
	layer(<Atmosphere />, [0, -10]),
	layer(<FarMarks />, [0, 24]),
	layer(<MidMarks />, [0, 68]),
	layer(<Accents />, [-4, -96]),
	layer(<AnchorLeft />, [0, 148]),
	layer(<AnchorRight />, [0, 188]),
	layer(<LogoMark />, [0, 20]),
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
