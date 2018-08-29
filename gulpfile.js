const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const chalk = require
//载入配置文件
const config = require('./gulp.ssh.js');
const sshConfig = config.ssh;
//打开ssh通道
const gulpSSH =  new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});
let startTime = new Date().getTime()
gulp.task('default', ['deployFile'], () => {
    // 将你的默认的任务代码放在这
    let endTime = new Date().getTime()
    let time = endTime - startTime
    console.log(`任务执行耗时${time}`)
});

/**
 * 上传文件
 */
gulp.task('deployFile', ['execSSH'],() => {
    console.log('开始上传文件...');
    return gulp
        .src(['./dist/**', '!**/node_modules/**'])
        .pipe(gulpSSH.dest(config.remoteDir));
});

/**
 * 执行命令,删除服务器上文件
 */
gulp.task('execSSH', () => {
    console.log('删除服务器上现有文件...');
    return gulpSSH.shell(config.commands, {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'));
});
