import React, {
	useCallback, useEffect, useRef, useState,
} from 'react';
import clsx from 'clsx';
import styles from './PhotoLooper.module.scss';

const PhotoLooper = ({
	speed,
	direction,
	children,
}: {
	speed: number;
	direction: 'right' | 'left';
	children: React.ReactNode;
}) => {
	const [looperInstances, setLooperInstances] = useState(1);
	const outerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	const resetAnimation = () => {
		if (innerRef.current) {
			innerRef.current.classList.remove(styles.animate);
			setTimeout(() => {
				innerRef.current?.classList.add(styles.animate);
			}, 50);
		}
	};

	const setupInstances = useCallback(() => {
		if (!innerRef.current || !outerRef.current) {
			return;
		}
		const { width } = innerRef.current.getBoundingClientRect();
		const { width: parentWidth } = outerRef.current.getBoundingClientRect();
		const instanceWidth = width / innerRef.current.children.length;
		if (instanceWidth !== 0 && width < parentWidth + instanceWidth) {
			setLooperInstances(looperInstances + Math.ceil(parentWidth / width));
		}
		resetAnimation();
	}, [looperInstances]);

	useEffect(() => {
		setupInstances();
	}, [setupInstances]);

	useEffect(() => {
		window.addEventListener('resize', setupInstances);
		return () => window.removeEventListener('resize', setupInstances);
	}, [setupInstances]);

	const childCount = React.Children.count(children);
	const duration = (childCount || 1) / looperInstances / speed;

	return (
		<div className={styles.looper} ref={outerRef}>
			<div
				ref={innerRef}
				className={clsx(styles.inner, styles.animate)}
				style={{
					['--looper-duration' as string]: `${duration}s`,
					['--looper-direction' as string]: direction === 'right' ? 'reverse' : 'normal',
					['--looper-slide' as string]: `-${100 / looperInstances}%`,
				}}
			>
				{Array.from({ length: looperInstances }).map((_, ind) => (
					<div className={styles.instance} key={ind}>
						{children}
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotoLooper;
