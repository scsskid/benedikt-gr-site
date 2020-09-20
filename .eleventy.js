const svgContents = require('eleventy-plugin-svg-contents');
const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const stringify = require('javascript-stringify').stringify;
const util = require('util');
const path = require('path');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const markdownItConfig = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt(markdownItConfig));

  eleventyConfig.addPassthroughCopy('src/_assets/js');
  eleventyConfig.addPassthroughCopy('src/_assets/fonts');
  eleventyConfig.addPassthroughCopy({ 'src/webrootfiles/*': '.' });

  eleventyConfig.addPlugin(svgContents);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add Collections
  const livePosts = (post) => post.date <= new Date() && !post.data.draft;
  const allPosts = (post) => post.date <= new Date();
  const posts = livePosts;
  eleventyConfig.addCollection('posts', (collection) => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(posts),
    ].reverse();
  });

  // Add Filters
  eleventyConfig.addFilter('console', function (value) {
    const output = stringify(value, null, '\t', { maxDepth: 2 });
    return '<script>console.log(' + output + ')</script>';
  });

  eleventyConfig.addFilter('dumpB', (obj) => {
    const inspectedObj = util.inspect(obj, { depth: 1 });
    const output = stringify(inspectedObj, null, '\t', { maxDepth: 1 });
    return `<script>console.log(${output})</script>`;
  });

  eleventyConfig.addFilter('baseName', (string) => {
    return path.basename(string, '.njk');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy');
  });

  eleventyConfig.addFilter('markdown', (string) => {
    return md.renderInline(string);
  });

  // Add Shortcodes and Tags
  let md = new markdownIt();
  eleventyConfig.addPairedShortcode('intro', (string) => {
    return `<div class="intro">${md.renderInline(string)}</div>`;
  });

  // Base

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    templateFormats: ['njk', 'md', 'html', 'yml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
