/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
// src/App.js
import React from 'react';

type APHCanvasProps = {
	name: string;
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

let examplesObj: NodeRequire;

class APHCanvasRenderer extends React.Component<APHCanvasProps> {
	aphExample: any;
	myRef: any;
	myRef2: any;

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.myRef2 = React.createRef();

		if (!examplesObj) {
			(window as any).BASE_URL = '../../../../examples';
			(window as any).parcelRequire = null;
			// eslint-disable-next-line global-require
			examplesObj = require('@site/static/examples/examples');
		}
	}

	componentDidMount() {
		const { name } = this.props;
		const config = { ...this.props };
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.aphExample = new (window as any).APH[name](config);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.aphExample.init(this.myRef.current);
	}

	componentWillUnmount() {
		if (this.aphExample) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

export default (props) => {
	if (typeof (window) !== 'undefined') {
		return <APHCanvasRenderer {...props} />;
	}
	return null;
};
