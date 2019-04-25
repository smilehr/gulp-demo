var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

//清空dist文件夹
gulp.task('clean', function() {
  return del(['dist/*']);
});

var paraTask = gulp.parallel(js, transTs, transLess, tranSass);
gulp.task('build', gulp.series(paraTask), function() {
  console.log('finish task build!');
});

//使用babel编译es
function js() {
  return gulp.src("src/js/*.es6")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));  
}

function transTs() {
  return tsProject.src()
  .pipe(tsProject())
  .js.pipe(gulp.dest("dist/js"));
}

function transLess() {
  return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css"));
}

function tranSass() {
  return gulp.src('src/css/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css"));
}

function copyImg() {

}

//监听文件变化并自动编译
gulp.task('watch', function() {
  gulp.watch('src/css/*', gulp.series('buildSass')).on('all', function(e, path, states) {
    if (e === 'unlink') { //删除文件时

    } else if (e === 'add') { //新增文件

    } else if (e === 'change') {  //修改文件

    }
  });
});

//废弃
gulp.task('watch2', function() {  //使用gulp-watch
  watch('src/css/*.scss', gulp.series('buildSass'));
});