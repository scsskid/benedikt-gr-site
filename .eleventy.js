const moment = require("moment");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/css");

	/**
	 * Date filter
	 * @param {Date} date
	 * @param {string} format - moment.js date formatting string
	 */
	eleventyConfig.addFilter("date", function(date, format) {
		return moment(date).format(format);
	});

	return {
		dir: {
			input: "src",
			output: "dist",
			data: "_data",
			includes: "_includes"
		},
		passthroughFileCopy: true,
		templateFormats: [
			"md",
			"css" // css is not yet a recognized template extension in Eleventy
		]
	};
};
