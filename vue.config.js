const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'

function joint (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isProd ? '/elm/' : '',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('components', joint('src/components'))
      .set('common', joint('src/common'))
      .set('api', joint('src/api'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
