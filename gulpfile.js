/*eslint-env node */

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserSync = require("browser-sync").create();

var jsOrder = [
    "./app.js",
    "services/**/*.service.js",
    "controllers/**/*.controller.js",
    "asset/*.js"
];

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
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("copy-html", function() {
    gulp.src("./index.html")
        .pipe(gulp.dest("./dist"));
});

gulp.task('scripts', function() {
    gulp.src(jsOrder)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});