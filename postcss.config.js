module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': {},
    'postcss-url': { url: 'copy', useHash: true },
    'postcss-preset-env': {
      stage: 0
    },
    cssnano: ctx.env === 'production' ? {} : false
  }
})
