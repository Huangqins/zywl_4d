const path = require('path')

function resolve (dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    baseUrl: '',
    devServer: {
        proxy: {
            '/ZR': {
                target: 'http://192.168.10.104:8080/',
                changeOrigin: true
            } 
        } 
    },
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('svg-icon')
                .test(/\.svg$/)
                .include
                    .add(resolve('src/icons'))
                    .end()
                .use('svg-sprite')
                    .loader('svg-sprite-loader')
                    .options({
                        symbolId : 'icon-[name]'
                    })

    }
}