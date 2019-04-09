var gulp = require('gulp'),
    less = require('gulp-less'),
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
    .pipe(gulp.dest("dist/css"));
});