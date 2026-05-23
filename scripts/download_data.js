const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const utils = require('./utils');
const decompress = require('decompress');

const config = require('../web.config');

const DOWNLOAD_TIMEOUT_MS = 600 * 1000;

const request = (url, options, onResponse) => new Promise((resolve, reject) => {
	const parsed = new URL(url);
	const lib = parsed.protocol === 'https:' ? https : http;
	const req = lib.request(url, options, (res) => {
		if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
			res.resume();
			const nextUrl = new URL(res.headers.location, url).href;
			request(nextUrl, options, onResponse).then(resolve).catch(reject);
			return;
		}
		onResponse(res, resolve, reject);
	});
	req.on('error', reject);
	req.setTimeout(DOWNLOAD_TIMEOUT_MS, () => {
		req.destroy(new Error(`Download timed out: ${url}`));
	});
	req.end();
});

const downloadToFile = (url, outputFile, label) => new Promise((resolve, reject) => {
	if (fs.existsSync(outputFile)) {
		fs.rmSync(outputFile);
	}

	const options = { method: 'GET' };
	if (url.startsWith('https:')) {
		options.rejectUnauthorized = false;
	}

	request(url, options, (res, resolveRequest, rejectRequest) => {
		if (res.statusCode !== 200) {
			res.resume();
			rejectRequest(new Error(`HTTP ${res.statusCode} for ${url}`));
			return;
		}

		const contentLength = Number.parseInt(res.headers['content-length'], 10) || 0;
		const fileOut = fs.createWriteStream(outputFile);
		let writtenData = 0;
		let lastLog = Date.now();

		const logProgress = () => {
			if (!contentLength) {
				console.log(`${Math.floor(writtenData / 1024)} KB`);
				return;
			}
			const pct = Math.floor((writtenData / contentLength) * 100);
			console.log(`${Math.floor(writtenData / 1024)}/${Math.floor(contentLength / 1024)} KB (${pct}%)`);
		};

		res.on('data', (chunk) => {
			writtenData += chunk.length;
			const now = Date.now();
			if (now - lastLog > 2000 || writtenData === contentLength) {
				lastLog = now;
				logProgress();
			}
		});

		res.pipe(fileOut);

		fileOut.on('finish', () => {
			fileOut.close(() => {
				console.log(`${label}...downloaded`);
				resolveRequest();
			});
		});

		fileOut.on('error', (err) => {
			fs.rmSync(outputFile, { force: true });
			rejectRequest(err);
		});

		res.on('error', rejectRequest);
	}).then(resolve).catch(reject);
});

const loadFile = async (url, outputFile) => {
	console.log(`${url}...downloading`);
	await downloadToFile(url, outputFile, url);
};

const loadAndUnzip = async (url, folder) => {
	const tempFile = `${folder}.zip`;
	console.log(`${folder}...downloading`);
	await downloadToFile(url, tempFile, folder);

	console.log(`${folder}...extracting`);
	await decompress(tempFile, `static/${folder}`);
	fs.rmSync(tempFile);
	console.log(`${folder}...done`);
};

const run = async () => {
	utils.deleteFolderRecursive('static/examples', true);
	utils.deleteFolderRecursive('static/slides', true);

	await loadAndUnzip(
		`${config.examples_url}/releases/download/${config.examples_version}/release.zip`,
		'examples',
	);
	await loadAndUnzip(
		`${config.slides_url}/releases/download/${config.slides_version}/release.zip`,
		'slides',
	);
	await loadFile(`${config.tiscali_url}`, 'static/tiscali.json');
};

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
