module.exports = {
  configureWebpack: {
    output: {
      library: 'singleChildVue',
      libraryTarget: 'umd',
    },
    devServer: {
      port: 3333,
    },
  }
}