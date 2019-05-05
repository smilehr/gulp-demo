# gulp-demo
something to how to build one gulp development

### 搭建步骤

1. 开始使用gulp
    1. 初始化环境

        ```
        npm init
        touch gulpfile.js
        ```

    2. 安装gulp依赖

        ```js
        npm install --global gulp
        npm install --save-dev gulp
        ```

    3. 使用gulp --[gulp指南](https://www.gulpjs.com.cn/docs/api/)

        ```js
        var gulp = require('gulp');
        gulp.task('default', function() {
          return gulp.src('src/js/*')
                  .pipe(gulp.dest('dist/js'));
        });
        ```

2. 使用`babel`编译js

    1. copy `html` 文件

        ```js
        function html() {
          return gulp.src("src/*.html", {base: 'dist'})
            .pipe(gulp.dest('dist'));
        }
        ```

    2. 编译`es6`

        ```js
        npm install --save-dev gulp-babel @babel/core @babel/preset-env gulp-uglify
        gulpfile.js:
        var gulp = require('gulp');
        var babel = require("gulp-babel");

        gulp.task("default", function () {
          return gulp.src("src/js/*")
            .pipe(uglify()) //压缩js
            .pipe(babel({
              presets: ['@babel/preset-env']
            }))
            .pipe(gulp.dest("dist/js"));
        });
        ```

    3. 编译`typescript` ---配置在`tsconfig.json`

      ```js
        npm install --save-dev typescript gulp gulp-typescript

        var gulp = require("gulp");
        var ts = require("gulp-typescript");
        var tsProject = ts.createProject("tsconfig.json");
        gulp.task("default", function () {
            return tsProject.src()
                .pipe(tsProject())
                .js.pipe(gulp.dest("dist"));
        });

      ```

    4. 编译`less` or `sass`

      1. 编译`less`

        ```js
        npm install --save-dev gulp-less

        gulp.task('buildLess', function() {
          return gulp.src('src/css/*.less')
            .pipe(less())
            .pipe(gulp.dest("dist/css"));
        });
        ```

      2. 编译`sass`

        ```js
        npm install --save-dev gulp-sass

        gulp.task('buildSass', function() {
          return gulp.src('src/css/*.scss')
            .pipe(sass())
            .pipe(gulp.dest("dist/css"));
        });
        ```
      3. 编译的同时压缩css

        ```js
        npm install --save-dev gulp-minify-css

        gulp.task('buildSass', function() {
          return gulp.src('src/css/*.scss')
            .pipe(sass())
            .pipe(cssmin())
            .pipe(gulp.dest("dist/css"));
        });
        ```

    5. 使用del清除文件

    ```js
    npm install --save-dev del
    
    vae del = require('del');

    gulp.task('clean', function() {
      return del('dist/*');
    });
    ```

    1. 使用`gulp-watch`监听文件变化，并自动编译

      ```js
      npm install --save-dev gulp-watch

      var watch = require('gulp-watch');
      gulp.task('watch', function() {
        var watcher = watch('src/css/*.scss', gulp.series('buildSass'));
        return watcher.on('change', function(e) {

        });
      });
      ```

    2. 使用`Browserify`