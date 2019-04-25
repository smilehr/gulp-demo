# gulp4.0升级踩坑

1. 任务序列变更

    ```js
    gulp.task('one', ['two', 'three', 'four'], function() {});  //写法错误

    gulp.task('one', gulp.series('two', 'three'), function() {  //串行执行
      // Do something after a, b, and c are finished.
    });

    gulp.task('one', gulp.parallel('two', 'three'), function() {  //并行执行
      // Build the website.
    });

    gulp.series('one', gulp.parallel('two', 'three'));  //二者可结合灵活运用
    ```

2. 放弃 `gulp.start()` `gulp.run()`

3. 不用再使用gulp.task('taskname', function() {})来指定task，可以通过function taskName() {}

4. gulp.watch()

    ```js
    gulp.watch('src', gulp.series('', '')).on('all', function(event, path, states) {
      event === 'add'     //新增文件
      event === 'unlink'  //删除文件
      event === 'change'  //修改文件

      path: 文件地址相对于gulpfile.js地址
    });
    ```

5. gulp.src 添加 since 选项，只匹配在某个固定时间后有修改的文件，这可以用来做增量构建

    ```js
    gulp.task('img', function images() {
    return gulp.src(Path.img.src, {since: gulp.lastRun('img')})
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 1}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true}
                ]
            })
        ]))
        .pipe(gulp.dest(Path[env]));
    })
    ```

6. gulp.src 添加base选项，修改存放路径

    ```js
    gulp.src('src/js/*.js',{base:'websrc'}).pipe(gulp.dest('dist'));    //输出目录为dist/js/*.js
    ```

7. gulp.src 接收的文件匹配字符串会顺序解释，所以你可以写成这样 gulp.src([‘.js’, ‘!b.js’, ‘bad.js’])（排除所有以 b 开头的 JS 文件但是除了 bad.js）