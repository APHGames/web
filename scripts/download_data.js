const { Curl, CurlFeature } = require('node-libcurl');
const fs = require('fs');
const utils = require('./utils');
const decompress = require("decompress");

const config = require('../web.config');


const loadFile = (url, outputFile, onFinish) => {
	const curl = new Curl();
	curl.setOpt(Curl.option.URL, url);
	curl.setOpt(Curl.option.HTTPGET);
	curl.setOpt(Curl.option.FOLLOWLOCATION, true);
	curl.setOpt(Curl.option.TIMEOUT, 600);
	curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
	curl.enable(CurlFeature.NoDataParsing);
	
	if(fs.existsSync(outputFile)) {
		fs.rmSync(outputFile);
	}
	const fileOut = fs.openSync(outputFile, 'w+')

	let time = Date.now();
	let writtenData = 0;

	curl.setOpt(Curl.option.WRITEFUNCTION, (buff, nmemb, size) => {
		let written = fs.writeSync(fileOut, buff, 0, nmemb * size);
		writtenData += written;
		const currTime = Date.now();
		// log each 2 seconds
		if(currTime - time > 2000 || writtenData === curl.getInfo('CONTENT_LENGTH_DOWNLOAD')) {
			time = currTime;
			console.log(Math.floor(writtenData / 1024) + '/' + Math.floor(curl.getInfo('CONTENT_LENGTH_DOWNLOAD') / 1024));
		}

		return written
	})

	const close = () => {
		curl.close.bind(curl);
		fs.closeSync(fileOut);
	}
	
	curl.on('end', (statusCode, data, headers) => {
		console.log(`${url}...downloaded`);
		close();
	});
	
	curl.on('error', (error, errorCode) => {
		throw error;
	});
	
	console.log(`${url}...downloading`);
	curl.perform();
}

const loadAndUnzip = (url, folder, onFinish) => {
	const curl = new Curl();
	curl.setOpt(Curl.option.URL, url);
	curl.setOpt(Curl.option.HTTPGET);
	curl.setOpt(Curl.option.FOLLOWLOCATION, true);
	curl.setOpt(Curl.option.TIMEOUT, 600);
	curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
	curl.enable(CurlFeature.NoDataParsing);
	
	const tempFile = `${folder}.zip`;
	const fileOut = fs.openSync(tempFile, 'w+')

	let time = Date.now();
	let writtenData = 0;

	curl.setOpt(Curl.option.WRITEFUNCTION, (buff, nmemb, size) => {
		let written = fs.writeSync(fileOut, buff, 0, nmemb * size);
		writtenData += written;
		const currTime = Date.now();
		// log each 2 seconds
		if(currTime - time > 2000 || writtenData === curl.getInfo('CONTENT_LENGTH_DOWNLOAD')) {
			time = currTime;
			const percentage = Math.floor(writtenData / 1024) / Math.floor(curl.getInfo('CONTENT_LENGTH_DOWNLOAD') / 1024);  
			if(percentage === NaN) {
				throw new Error('The desired file is not available.');
			}
			console.log(Math.floor(percentage * 100) + '%');
		}

		return written
	})
	
	const unzip = () => {
		console.log(`${folder}...extracting`);
		decompress(tempFile, `static/${folder}`)
		.then(() => {
			fs.rmSync(tempFile);
			console.log(`${folder}...done`);
			onFinish && onFinish();
		}).catch(err => console.error(err));
	}
	
	const close = () => {
		curl.close.bind(curl);
		fs.closeSync(fileOut);
		unzip();
	}
	
	curl.on('end', (statusCode, data, headers) => {
		console.log(`${folder}...downloaded`);
		close();
	});
	
	curl.on('error', (error, errorCode) => {
		throw error;
	});
	
	console.log(`${folder}...downloading`);
	curl.perform();
}

utils.deleteFolderRecursive('static/examples', true);
utils.deleteFolderRecursive('static/slides', true);


// todo promisify this shizzle
loadAndUnzip(`${config.examples_url}/releases/download/${config.examples_version}/release.zip`, 'examples', () => {
	loadAndUnzip(`${config.slides_url}/releases/download/${config.slides_version}/release.zip`, 'slides', () => {
		loadFile(`${config.tiscali_url}`, 'static/tiscali.json');
	});
});