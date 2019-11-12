const moment = require('moment')
const svgContents = require('eleventy-plugin-svg-contents')
const { DateTime } = require('luxon')
const he = require('he')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItContainer = require('markdown-it-container')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItConfig = {
  html: true,
  breaks: true,
  linkify: false
}
const markdownItAnchorConfig = {
  permalink: true,
  permalinkClass: 'bookmark',
  permalinkSymbol: '#'
}

const md = markdownIt(markdownItConfig)
  .use(markdownItFootnote)
  .use(markdownItAttrs)
  .use(markdownItContainer, 'note')
  .use(markdownItContainer, 'table-wrapper')
  .use(markdownItAnchor, markdownItAnchorConfig)

module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy('src/assets/images')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/.htaccess')

  eleventyConfig.addPlugin(svgContents)
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('src/blog/*.md').sort((a, b) => b.date - a.date)
  })

  eleventyConfig.addFilter('markdown', string => {
    return md.renderInline(string)
  })

  eleventyConfig.addFilter('decodeHtmlEntities', string => {
    return he.decode(string)
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLLL yyyy')
  })

  eleventyConfig.addFilter('markdown', string => {
    return md.renderInline(string)
  })

  // Match Firebase’s `cleanUrls` setting.
  eleventyConfig.addFilter('clean', path => {
    if (path === '/') return path
    if (path === 'https://v8.dev/') return path
    if (path.endsWith('/')) return path.slice(0, -1)
    return path
  })

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },

    templateFormats: ['njk', 'md', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}
