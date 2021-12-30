// src/App.js
import React from 'react';

type APHCanvasProps = {
	name: string,
};

let examplesObj: NodeRequire;

class APHCanvasRenderer extends React.Component<APHCanvasProps> {
	aphExample: any;
	myRef: any;

	constructor(props) {
		super(props);
		this.myRef = React.createRef();

		if (!examplesObj) {
			(window as any).BASE_URL = '../../../../examples';
			(window as any).parcelRequire = null;
			// eslint-disable-next-line global-require
			examplesObj = require('@site/static/examples/examples');
		}
	}

	initKeyboardBlock = () => {
		window.addEventListener('keydown', this.preventKeyboard);
	}

	/**
	 * Will prevent the keyboard from scrolling the page once we click
	 * on the canvas
	 */
	preventKeyboard = (e: KeyboardEvent) => {
		switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
	}

	componentDidMount() {
		const { name } = this.props;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		this.aphExample = new (window as any).APH[name]({ ...this.props });
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

	render() {
		return <canvas id={'myCanvas'} ref={this.myRef} width={800} height={600} tabIndex={0} onClick={this.initKeyboardBlock} />;
	}
}

export default (props) => {
	if (typeof (window) !== 'undefined') {
		return <APHCanvasRenderer {...props} />;
	}
	return null;
};
