// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143
module.exports = {
  publicPath: 'http://localhost:8081', // hash 路由
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
      library: `app1`, // 定一个名称不重复就好
      libraryTarget: 'umd',
    },
  },
}