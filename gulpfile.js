/*eslint-env node */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', [], function() {
    gulp.watch('./*')
        .on('change',browserSync.reload);
    browserSync.init({
        server: './',
        port: 8080
    });
});