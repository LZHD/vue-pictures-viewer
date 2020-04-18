module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-pictures-viewer/' : '/',
  outputDir: 'publish',
  css: { extract: false },
  productionSourceMap: false
};
