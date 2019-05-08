var gulp = require('gulp'),
    del = require('del'),
    oPath = require('path'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    connect = require('gulp-connect');

var env = 'dev'; // 用于执行gulp任务时的判断,默认为生产环境
var paraTask = gulp.parallel(html, js, transLess); //并行执行任务序列

var jsPath = 'src/js/**/*.js',
    cssPath = 'src/css/**/*.less',
    htmlPath = 'src/*.html',
    imgPath = 'src/assets/**/*.*';


//开发环境编译
gulp.task('build', gulp.series(setEnv('build'), clean, paraTask), function(done) {
  done();
});

//生产环境编译
gulp.task('dev', gulp.series(setEnv('dev'), clean, paraTask), function(done) {
  done();
});

//启动监听服务
gulp.task('watch', function(done) {
  //监听less或css
  gulp.watch(cssPath, gulp.series(transLess, reload)).on('all', function(e, path, states) {
    if (e === 'unlink') { //当删除文件时要做的事  相对应的：add:新增; change: 修改
      del('dist/css/**/' + oPath.basename(path, '.less') + '.css');
    }
  });
  gulp.watch(jsPath, gulp.series(js, reload)).on('all', function(e, path, states) {
    if (e === 'unlink') {
      del('dist/js/**/' + oPath.basename(path, '.js') + '.js');
    }
  });
  gulp.watch(htmlPath, gulp.series(html, reload)).on('all', function(e, path, states) {
    if (e === 'unlink') {
      del('dist/' + oPath.basename(path, '.html') + '.html');
    }
  });
  gulp.watch(imgPath, gulp.series(images, reload)).on('all', function(e, path, states) {
    if (e === 'unlink') {
      del('dist/assets/**/' + oPath.basename(path) );
    }
  });
  return serve();
});

//清除dist文件夹
gulp.task('clean', function() {
  return del(['dist/*']);
});


function setEnv(type){
  return () => {
    return new Promise(function(resolve, reject) {
      console.log(type);
      env = type || 'dev';
      resolve();
    })
  }
}

function html() {
  return gulp.src(htmlPath, {base: 'src'})
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp.src(imgPath, {base: 'src'})
    .pipe(gulp.dest('dist'));
}

//使用babel编译es
function js() {
  var stream = gulp.src(jsPath, {base: 'src'}).pipe(sourcemaps.init()).pipe(babel());
  env === 'dev' ? stream.pipe(uglify({ mangle: true, compress: true })) : '';
  return stream.pipe(sourcemaps.write(".")).pipe(gulp.dest("dist"));
}

//编译less
function transLess() {
  var stream = gulp.src(cssPath, {base: 'src'}).pipe(less());
  env === 'dev' ? stream.pipe(cssmin()) : '';
  return stream.pipe(gulp.dest("dist"));
}

//清除dist文件
function clean() {
  return del('dist/*');
}

function reload() {
  return gulp.src("dist/**/*.html").pipe(connect.reload());
}

function serve() {
  return connect.server({
    root: "./dist",
		livereload: true,
		port: 9090
  });
}