const moment = require("moment");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/.htaccess");

  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml"],
    htmlTemplateEngine: "njk"
  };
};
