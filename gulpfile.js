var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

//使用babel编译es
gulp.task("buildEs", function () {
  return gulp.src("src/js/*.es6")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});

//编译ts
gulp.task('buildTs', function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/js"));
});

//编译less
gulp.task('buildLess', function() {
  return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css"));
});

//编译sass
gulp.task('buildSass', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css"));
});

//清空dist文件夹
gulp.task('clean', function() {
  return del(['dist/*']);
});

//监听文件变化并自动编译
gulp.task('watch', function() {
  return watch('src/css/*.scss', gulp.series('buildSass')).on('change', function(e) {
    console.log(e.type);
  });
});