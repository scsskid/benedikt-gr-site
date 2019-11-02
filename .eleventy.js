const moment = require("moment");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/.htaccess");

  return {
    dir: { input: "src", output: "dist", data: "_data" },

    templateFormats: ["njk", "md", "html", "yml"],
    htmlTemplateEngine: "njk"
  };
};
