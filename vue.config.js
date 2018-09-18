const path = require('path')
const host = 'http://192.168.10.104:8080'

function resolve(dir) {
    return path.join(__dirname, './', dir)
}
module.exports = {
    baseUrl: '',
    devServer: {
        proxy: {
            '/ZR/': {
                target: host,
                changeOrigin: true
            }
        }
    },
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                data: `
                  @import "@/styles/variables.scss";
                  @import "@/styles/mixin.scss";
                `
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('public', resolve('public'))
            .set('mixins', resolve('src/mixins'));
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