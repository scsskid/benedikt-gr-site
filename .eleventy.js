const moment = require('moment')
const svgContents = require('eleventy-plugin-svg-contents')

module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy('src/assets/images')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/.htaccess')

  eleventyConfig.addPlugin(svgContents)

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },

    templateFormats: ['njk', 'md', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}
