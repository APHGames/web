const { Curl, CurlFeature } = require('node-libcurl');
const fs = require('fs');
const unzipper = require('unzipper');
const utils = require('./utils');

const config = require('../web.config');

const loadData = (url, folder, onFinish) => {
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
			console.log(Math.floor(writtenData / 1024) + '/' + Math.floor(curl.getInfo('CONTENT_LENGTH_DOWNLOAD') / 1024));
		}

		return written
	})
	
	const unzip = () => {
		console.log(`${folder}...extracting`);
		fs.createReadStream(tempFile)
		.pipe(unzipper.Extract({ path: `static/${folder}` }))
		.on('entry', entry => entry.autodrain())
		.promise()
		.then( () => {
			fs.rmSync(tempFile);
			console.log(`${folder}...done`);
			onFinish && onFinish();
		}, e => console.error(e));
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



loadData(`${config.examples_url}/releases/download/${config.examples_version}/release.zip`, 'examples', () => {
	loadData(`${config.slides_url}/releases/download/${config.slides_version}/release.zip`, 'slides');
});