var gulp = require('gulp'),
    fs = require('fs');
    del = require('del'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

var env = 'dev'; // 用于执行gulp任务时的判断
function set_env(type){ 
  env = type || 'dev';
  // 生成env.js文件，用于开发页面时，判断环境
  fs.writeFile("./env.js", 'export default ' + env + ';', function(err){
    err && console.log(err);
  });
}

//清空dist文件夹
gulp.task('clean', function() {
  return del(['dist/*']);
});

var paraTask = gulp.parallel(html, js, transTs, transLess, tranSass);

gulp.task('dev', function() {});
gulp.task('build', gulp.series(clean, paraTask), function() {
  console.log('finish task build!');
});

function html() {
  return gulp.src("src/*.html")
    .pipe(gulp.dest('dist'));
}

//使用babel编译es
function js() {
  return gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify({
      mangle: true,//类型：Boolean 默认：true 是否修改变量名
      compress: true//类型：Boolean 默认：true 是否完全压缩
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

function clean() {
  return del('dist/*');
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