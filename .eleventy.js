const moment = require('moment')
const svgContents = require('eleventy-plugin-svg-contents')
const { DateTime } = require('luxon')
const he = require('he')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItContainer = require('markdown-it-container')
const markdownItFootnote = require('markdown-it-footnote')
const stringify = require('javascript-stringify').stringify
const util = require('util')

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
  eleventyConfig.addPassthroughCopy('src/_assets/js')
  eleventyConfig.addPassthroughCopy('src/.htaccess')

  eleventyConfig.addPlugin(svgContents)

  // eleventyConfig.addCollection('posts', collection => {
  //   return collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => b.date - a.date)
  // })

  const livePosts = post => post.date <= new Date() && !post.data.draft
  const allPosts = post => post.date <= new Date()
  eleventyConfig.addCollection('posts', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)].reverse()
  })

  eleventyConfig.addFilter('markdown', string => {
    return md.renderInline(string)
  })

  eleventyConfig.addFilter('console', function(value) {
    const output = stringify(value, null, '\t', { maxDepth: 2 })
    return '<script>console.log(' + output + ')</script>'
  })

  eleventyConfig.addFilter('dumpB', obj => {
    const inspectedObj = util.inspect(obj, { depth: 1 })
    const output = stringify(inspectedObj, null, '\t', { maxDepth: 1 })
    return `<script>console.log(${output})</script>`
  })

  eleventyConfig.addFilter('decodeHtmlEntities', string => {
    return he.decode(string)
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
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
