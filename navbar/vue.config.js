// 添加 vue.config.js, vue-cli-service 会默认去识别

module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  css: {
    extract: false, // 不抽离css，开发默认是 false
  },
  chainWebpack: config => {
    // config.output
    //   .filename('main.js')
    //   .end

    config.optimization.delete('splitChunks') // 默认会生成 chunk-vendor，让其放入到 app.js
  }
}