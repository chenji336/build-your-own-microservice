// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143
module.exports = {
  // publicPath: isRun ? 'http://localhost:8082' : '/', // history
  publicPath: 'http://localhost:8082', // hash
  chainWebpack: config => {
    config.devServer.set('inline', false)
    config.devServer.set('hot', false)
  },
  filenameHashing: false,
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `app2`, // 定一个名称不重复就好
      libraryTarget: 'umd',
    },
  },
}