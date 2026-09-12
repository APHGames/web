/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

type APHCanvasProps = {
	name: string;
	examplesBase?: string;
	secondCanvas?: boolean;
	// if true, the game will be automatically resized to fit the screen
	resizeToScreen?: boolean;
	// if true, the canvas will be transparent
	transparent?: boolean;
	// color of the canvas
	backgroundColor?: number;
	// will use antialias for rendering
	antialias?: boolean;
	// canvas width
	width?: number;
	// canvas height
	height?: number;
	// scale of all displayed objects
	resolution?: number;
	// upper threshold of game loop in ms
	gameLoopThreshold?: number;
	// number of ms for each frame (only for fixed game loop)
	gameLoopFixedTick?: number;
	// speed of the game (1 by default)
	speed?: number;
	// id of the canvas (used only if there are more canvas objects)
	canvasId?: string;
};

type WindowWithAPH = Window & {
	APH?: Record<string, new (config: Record<string, unknown>) => {
		init: (canvas: HTMLCanvasElement) => void;
		destroy: () => void;
	}>;
	BASE_URL?: string;
};

const SCRIPT_ATTR = 'data-aph-examples';

let examplesLoad: Promise<void> | null = null;

const loadExamplesBundle = (examplesBase: string): Promise<void> => {
	const win = window as WindowWithAPH;
	win.BASE_URL = examplesBase;

	if (win.APH) {
		return Promise.resolve();
	}

	if (examplesLoad) {
		return examplesLoad;
	}

	const src = `${examplesBase}/examples.js`;

	examplesLoad = new Promise((resolve, reject) => {
		const existing = document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}="true"]`);
		const onReady = () => {
			if (win.APH) {
				resolve();
				return;
			}
			reject(new Error('Examples bundle loaded without window.APH'));
		};

		if (existing) {
			if (win.APH) {
				resolve();
				return;
			}
			existing.addEventListener('load', onReady);
			existing.addEventListener('error', () => reject(new Error('Failed to load examples bundle')));
			return;
		}

		const script = document.createElement('script');
		script.src = src;
		script.async = false;
		script.setAttribute(SCRIPT_ATTR, 'true');
		script.addEventListener('load', onReady);
		script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
		document.body.appendChild(script);
	}).catch((error) => {
		examplesLoad = null;
		throw error;
	});

	return examplesLoad;
};

class APHCanvasRenderer extends React.Component<APHCanvasProps> {
	aphExample?: { init: (canvas: HTMLCanvasElement) => void; destroy: () => void; };

	myRef: React.RefObject<HTMLCanvasElement>;

	myRef2: React.RefObject<HTMLCanvasElement>;

	unmounted = false;

	constructor(props: APHCanvasProps) {
		super(props);
		this.myRef = React.createRef();
		this.myRef2 = React.createRef();
	}

	componentDidMount() {
		const { name, examplesBase = '/examples', ...config } = this.props;

		loadExamplesBundle(examplesBase).then(() => {
			if (this.unmounted || !this.myRef.current) {
				return;
			}

			const Example = (window as WindowWithAPH).APH?.[name];
			if (!Example) {
				throw new Error(`Unknown example "${name}"`);
			}

			this.aphExample = new Example(config);
			this.aphExample.init(this.myRef.current);
		}).catch((error) => {
			if (!this.unmounted) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		});
	}

	componentWillUnmount() {
		this.unmounted = true;
		if (this.aphExample) {
			this.aphExample.destroy();
		}
		window.removeEventListener('keydown', this.preventKeyboard);
	}

	initKeyboardBlock = () => {
		window.addEventListener('keydown', this.preventKeyboard);
	};

	/**
	 * Will prevent the keyboard from scrolling the page once we click
	 * on the canvas
	 */
	preventKeyboard = (e: KeyboardEvent) => {
		switch (e.keyCode) {
			case 37: case 39: case 38: case 40: // Arrow keys
			case 32: e.preventDefault(); break; // Space
			default: break; // do not block other keys
		}
	};

	render() {
		const { canvasId } = this.props;
		return (
			<>
				<canvas id="myCanvas" ref={this.myRef} width={800} height={600} tabIndex={0} onClick={this.initKeyboardBlock} />
				{canvasId && <canvas id={canvasId} ref={this.myRef2} width={800} height={600} tabIndex={0} onClick={this.initKeyboardBlock} />}
			</>
		);
	}
}

const APHCanvas = (props: APHCanvasProps) => {
	const examplesBase = useBaseUrl('/examples').replace(/\/$/, '');

	if (typeof window === 'undefined') {
		return null;
	}

	return <APHCanvasRenderer {...props} examplesBase={examplesBase} />;
};

export default APHCanvas;
