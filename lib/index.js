const { readFile } = require('node:fs/promises');
const puppeteer = require('puppeteer');
const { compile } = require('handlebars');

const puppeteer_args = [
	'--disable-features=IsolateOrigins',
	'--disable-site-isolation-trials',
	'--autoplay-policy=user-gesture-required',
	'--disable-background-networking',
	'--disable-background-timer-throttling',
	'--disable-backgrounding-occluded-windows',
	'--disable-breakpad',
	'--disable-client-side-phishing-detection',
	'--disable-component-update',
	'--disable-default-apps',
	'--disable-domain-reliability',
	'--disable-extensions',
	'--disable-features=AudioServiceOutOfProcess',
	'--disable-hang-monitor',
	'--disable-ipc-flooding-protection',
	'--disable-notifications',
	'--disable-offer-store-unmasked-wallet-cards',
	'--disable-popup-blocking',
	'--disable-print-preview',
	'--disable-prompt-on-repost',
	'--disable-renderer-backgrounding',
	'--disable-speech-api',
	'--disable-sync',
	'--hide-scrollbars',
	'--ignore-gpu-blacklist',
	'--metrics-recording-only',
	'--mute-audio',
	'--no-default-browser-check',
	'--no-first-run',
	'--no-pings',
	'--no-zygote',
	'--password-store=basic',
	'--use-gl=swiftshader',
	'--use-mock-keychain',
];

/**
 * Read HBS Template from Path
 * @param {string} filePath HBS Template Path
 */
const readTemplate = async (filePath) => {
	try {
		return await readFile(filePath, 'utf-8');
	} catch (error) {
		throw new Error(`Error Reading Template`, error);
	}
};

/**
 * Generate PDF From HTML String
 * @param {Document} content HTML String
 * @param {string[]} puppeteerArgs Puppeteer Arguments
 */
const generatePDF = async (content, puppeteerArgs = puppeteer_args) => {
	// Launch Puppeteer
	const browser = await puppeteer.launch({
		args: [
			'--no-sandbox',
			'--disable-dev-shm-usage',
			'--disable-setuid-sandbox',
			...puppeteerArgs,
		],
	});
	const page = await browser.newPage();

	// Set the HTML content of the page
	await page.setContent(content);

	// Generate the PDF
	const pdfBuffer = await page.pdf();

	// Close the browser
	await browser.close();

	return pdfBuffer;
};

/**
 * Compile HBS Template into HTML String
 * @param {string} template HBS Template String
 * @param {Object.<string, unknown>} data
 * @returns {Document}
 */
const compileTemplate = (template, data) => {
	try {
		const compiledTemplate = compile(template);
		return compiledTemplate(data);
	} catch (error) {
		throw new Error(`Error Compiling Template`, error);
	}
};

module.exports = { readTemplate, compileTemplate, generatePDF };
