const appName = 'zywl';
module.exports = {
    version: '0.1.0',
    ssh: {
        host: '118.24.16.208',
        port: 22,
        username: 'root',
        password: 'xiaoguozi000'
    },
    remoteDir: '/usr/local/nginx/html',
    commands: [
        //删除已有文件
        'rm -rf /usr/local/nginx/html/static',
        'rm -rf /usr/local/nginx/html/index.html',
    ]
}