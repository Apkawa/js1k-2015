var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jscrush = require('gulp-jscrush');
var rename = require('gulp-rename');
var closureCompiler = require('gulp-closure-compiler');
var gcallback = require('gulp-callback');
var gutil = require('gulp-util');
var fs = require('fs');


gulp.task('closure-compile', function () {
    gulp.src("./js1k.js")
        .pipe(closureCompiler({
                compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
                compilerFlags: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                },
                fileName: "js1k.compiled.js"
            }
        ))
        .pipe(gulp.dest('./dest/'))
});

gulp.task('minify', ['closure-compile'], function () {
    gulp.src('./dest/js1k.compiled.js')
        .pipe(uglify())
        .pipe(jscrush())
        .pipe(rename('js1k.min.js'))
        .pipe(gulp.dest('./dest/'))
        .pipe(gcallback(function () {
            gutil.log('Source size', gutil.colors.magenta(
                fs.statSync('./js1k.js')['size'] + ' bytes'));
            gutil.log('Result size', gutil.colors.magenta(
                fs.statSync('./dest/js1k.min.js')['size'] + ' bytes'));

        }))
});
gulp.task('default', ['minify'], function () {
});

gulp.task('watch', function () {
    gulp.watch('./js1k.js', ['default'])
});
