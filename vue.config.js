const webpack = require('webpack');

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '万家寨水控电子商城'
        return args
      })
  },
  // publicPath: '/sun_go/',
  devServer: {
    proxy: {
      '/sun_go_api': {
        target: 'http://192.168.0.12:8082/mall',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/sun_go_api': '/'
        }
      }
    }
  },
  productionSourceMap: false
}
