/*eslint-env node */

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create();

gulp.task("default", ["copy-html","styles"], function() {
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch("./*")
        .on("change",browserSync.reload);
    gulp.watch("./*/*")
        .on("change",browserSync.reload);
    browserSync.init({
        server: "./",
        port: 8080
    });
});


gulp.task("styles", function() {
    gulp.src("sass/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("copy-html", function() {
    gulp.src("./index.html")
        .pipe(gulp.dest("./dist"));
});