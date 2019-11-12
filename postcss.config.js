module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': {},
    'postcss-url': { url: 'copy', useHash: true },
    'postcss-mixins': {},
    'postcss-preset-env': {
      stage: 1
    },
    cssnano: ctx.env === 'production' ? {} : false
  }
})
