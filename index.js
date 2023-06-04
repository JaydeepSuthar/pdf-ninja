const { readTemplate, compileTemplate, generatePDF } = require("./lib");

/**
 * Generate Dyanmic PDF
 * @param {string} filePath HBS Template Path
 * @param {Object.<string, unknown>} data
 */
const generateDyanmicPDF = async (templatePath, data) => {
	const hbsTemplate = await readTemplate(templatePath);

	const htmlString = compileTemplate(hbsTemplate, data);

	const buffer = await generatePDF(htmlString);

	return buffer;
};

module.exports = {
	generateDyanmicPDF,
	generateStaticPDF: generatePDF,
};
