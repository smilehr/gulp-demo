var gulp = require('gulp'),
    del = require('del'),
    oPath = require('path'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

var env = 'dev'; // 用于执行gulp任务时的判断,默认为生产环境
var paraTask = gulp.parallel(html, js, transTs, transLess, tranSass); //并行执行任务序列

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
  gulp.watch('src/css/*.less', gulp.series(tranLess)).on('all', function(e, path, states) {
    if (e === 'unlink') { //当删除文件时要做的事  相对应的：add:新增; change: 修改
      del('dist/css/' + oPath.basename(path, '.less') + '.css');
    }
  });
  gulp.watch('src/js/*.js', gulp.series(js)).on('all', function(e, path, states) {
    if (e === 'unlink') {
      del('dist/js/' + oPath.basename(path, '.js') + '.js');
    }
  });
  gulp.watch('src/*.html', gulp.series(html)).on('all', function(e, path, states) {
    if (e === 'unlink') {
      del('dist/' + oPath.basename(path, '.html') + '.html');
    }
  });
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

//清空dist文件夹
gulp.task('clean', function() {
  return del(['dist/*']);
});

gulp.task('test', gulp.series(setEnv('dev'), js), function() {});

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
  var stream = gulp.src("src/js/*.js").pipe(sourcemaps.init()).pipe(babel());
  env === 'dev' ? stream.pipe(uglify({ mangle: true, compress: true })) : '';
  return stream.pipe(sourcemaps.write(".")).pipe(gulp.dest("dist/js"));
}

//编译typescript
function transTs() {
  var stream = tsProject.src().pipe(tsProject()).js;
  env === 'dev' ? stream.pipe(uglify({ mangle: true, compress: true })) : '';
  return stream.pipe(gulp.dest("dist/js"));
}

//编译less
function transLess() {
  var stream = gulp.src('src/css/*.less').pipe(less());
  env === 'dev' ? stream.pipe(cssmin()) : '';
  return stream.pipe(gulp.dest("dist/css"));
}

//编译sass（暂未用）
function tranSass() {
  var stream = gulp.src('src/css/*.scss').pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError));
  env === 'dev' ? stream.pipe(cssmin()) : '';
  return stream.pipe(gulp.dest("dist/css"));
}

function clean() {
  return del('dist/*');
}

/**
 * 根据路径删除相应文件，用于gulp.watch().on('all', function(e, path, states) {});
 * @param {*} e 
 * @param {*} path 
 * @param {*} states 
 */
function dFByPath(e, path, states) {
  var filename = '';
  if (e === 'unlink') { //删除文件时

  } else if (e === 'add') { //新增文件

  } else if (e === 'change') {  //修改文件

  }
}

//监听文件变化并自动编译
gulp.task('watch_bak', function() {
  gulp.watch('src/css/*', gulp.series('buildSass')).on('all', dFByPath);
});

//废弃
gulp.task('watch2', function() {  //使用gulp-watch
  watch('src/css/*.scss', gulp.series('buildSass'));
});