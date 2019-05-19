var gulp = require('gulp'),
		del = require('del'),
		oPath = require('path'),
		sass = require('gulp-sass'),
		cssmin = require('gulp-minify-css'),
		sourceMap = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify'),
		ts = require("gulp-typescript"),
		tsProject = ts.createProject("tsconfig.json"),
		connect = require('gulp-connect');

var env = 'dev'; // 用于执行gulp任务时的判断,默认为生产环境
var paraTask = gulp.parallel(html, images, transTs, transSass); //并行执行任务序列

var jsPath = 'src/js/**/*.ts',
		cssPath = 'src/css/**/*',
		htmlPath = 'src/*.html',
		imgPath = 'src/assets/**/*.*';

//开发环境编译
gulp.task('build', gulp.series(setEnv('build'), clean, paraTask), function (done) {
	done();
});

//生产环境编译
gulp.task('dev', gulp.series(setEnv('dev'), clean, paraTask), function (done) {
	done();
});

//启动监听服务
gulp.task('watch', function (done) {
	//监听less或css
	gulp.watch(cssPath, gulp.series(transSass)).on('all', function (e, path, states) {
		if (e === 'unlink') { //当删除文件时要做的事	相对应的：add:新增; change: 修改
			del('dist/css/**/' + oPath.basename(path, '.scss') + '.css');
		}
	});
	gulp.watch(jsPath, gulp.series(transTs)).on('all', function (e, path, states) {
		if (e === 'unlink') {
			del('dist/js/**/' + oPath.basename(path, '.ts') + '.js');
		}
	});
	gulp.watch(htmlPath, gulp.series(html)).on('all', function (e, path, states) {
		if (e === 'unlink') {
			del('dist/' + oPath.basename(path, '.html') + '.html');
		}
	});
	gulp.watch(imgPath, gulp.series(images, reload)).on('all', function (e, path, states) {
		if (e === 'unlink') {
			del('dist/assets/**/' + oPath.basename(path));
		}
	});
	return serve();
});

function setEnv(type) {
	return () => {
		return new Promise(function (resolve, reject) {
			env = type || 'dev';
			resolve();
		});
	}
}

function html() {
	return gulp.src(htmlPath, { base: 'src' })
		.pipe(gulp.dest('dist'));
}

function images() {
	return gulp.src(imgPath, { base: 'src' })
		.pipe(gulp.dest('dist'));
}

//编译typescript
function transTs() {
	var stream = tsProject.src().pipe(sourceMap.init()).pipe(tsProject()).js;
  env === 'dev' ? stream.pipe(uglify({ mangle: true, compress: true })) : '';
  return stream.pipe(sourceMap.write('../maps/',{addComment: false})).pipe(gulp.dest("dist/js"));
}

//编译sass
function transSass() {
	var stream = gulp.src(cssPath, { base: 'src' }).pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError));
	env === 'dev' ? stream.pipe(cssmin()) : '';
	return stream.pipe(gulp.dest("dist"));
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

//清空dist文件夹
function clean() {
	return del('dist/*');
}