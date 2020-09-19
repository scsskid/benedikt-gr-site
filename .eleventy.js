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
const path = require('path')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const markdownItConfig = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt(markdownItConfig))

  eleventyConfig.addPassthroughCopy('src/_assets/js')
  eleventyConfig.addPassthroughCopy('src/_assets/fonts')
  eleventyConfig.addPassthroughCopy({ 'src/webrootfiles/*': '.' })

  eleventyConfig.addPlugin(svgContents)
  eleventyConfig.addPlugin(syntaxHighlight)

  // Add Collections

  // eleventyConfig.addCollection('posts', collection => {
  //   return collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => b.date - a.date)
  // })

  const livePosts = post => post.date <= new Date() && !post.data.draft
  const allPosts = post => post.date <= new Date()
  const posts = livePosts
  eleventyConfig.addCollection('posts', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(posts)].reverse()
  })

  // Add Filters

  // eleventyConfig.addFilter('markdown', string => {
  //   return md.renderInline(string)
  // })

  eleventyConfig.addFilter('console', function(value) {
    const output = stringify(value, null, '\t', { maxDepth: 2 })
    return '<script>console.log(' + output + ')</script>'
  })

  eleventyConfig.addFilter('dumpB', obj => {
    const inspectedObj = util.inspect(obj, { depth: 1 })
    const output = stringify(inspectedObj, null, '\t', { maxDepth: 1 })
    return `<script>console.log(${output})</script>`
  })

  eleventyConfig.addFilter('baseName', string => {
    return path.basename(string, '.njk')
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

  // Add Shortcodes and Tags
  let md = new markdownIt()
  eleventyConfig.addPairedShortcode('intro', string => {
    return `<div class="intro">${md.renderInline(string)}</div>`
  })

  // Base

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },

    templateFormats: ['njk', 'md', 'html', 'yml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
