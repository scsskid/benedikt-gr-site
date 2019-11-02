module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": {},
    "postcss-url": { url: "copy", useHash: true },
    cssnano: ctx.env === "production" ? {} : false
  }
});
