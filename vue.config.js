const path = require('path')
function resolve(url) {
  return path.join(__dirname, url)
}

module.exports = {
  // chainWebpack: (config) => {
  //   config.plugin('html').tap((args) => {
  //     args[0].title = '大学生心理测评'
  //     return args
  //   })
  // },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    disableHostCheck: true
  }
}
