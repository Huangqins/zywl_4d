const path = require('path')

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    baseUrl: '',
    devServer: {
        proxy: {
            '/ZR': {
                target: process.env.VUE_APP_ENV_HOST,
                changeOrigin: true
            }
        }
    },
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude
            .add(resolve('src/icons'));
        config.module
            .rule('svg-icon')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons'))
            .end()
            .use('svg-sprite')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    }
}