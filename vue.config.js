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
    productionSourceMap: false
}