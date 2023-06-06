const { readTemplate, compileTemplate, generatePDF } = require("./lib");

/**
 * Generate Dynamic PDF
 * @param {string} templatePath HBS Template Path
 * @param {Object.<string, unknown>} data
 */
const generateDynamicPDF = async (templatePath, data) => {
	const hbsTemplate = await readTemplate(templatePath);

	const htmlString = compileTemplate(hbsTemplate, data);

	const buffer = await generatePDF(htmlString);

	return buffer;
};

module.exports = {
	generateDynamicPDF: generateDynamicPDF,
	generateStaticPDF: generatePDF,
};
