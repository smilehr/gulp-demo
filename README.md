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

        ```
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
    1. 编译`es6`

        ```js
        npm install --save-dev gulp-babel @babel/core @babel/preset-env
        gulpfile.js:
        var gulp = require('gulp');
        var babel = require("gulp-babel");

        gulp.task("default", function () {
          return gulp.src("src/js/*")
            .pipe(babel({
              presets: ['@babel/preset-env']
            }))
            .pipe(gulp.dest("dist/js"));
        });
        ```

    2. 编译`typescript` ---配置在`tsconfig.json`

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

      ```js

      ```

    3. 编译`less` or `sass`

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

    4. 使用`Watchify`
    5. 使用`Browserify`