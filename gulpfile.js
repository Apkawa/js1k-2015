var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jscrush = require('gulp-jscrush');
var rename = require('gulp-rename');
var closureCompiler = require('gulp-closure-compiler');


gulp.task('default', function () {
    // place code for your default task here
    gulp.src("./js1k_uncompress.js")
        .pipe(closureCompiler({
                compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
                compilerFlags: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                },
                fileName: "js1k.compiled.js"
            }
        ))
        .pipe(gulp.dest('./dest/'))

    gulp.src('./dest/js1k.compiled.js')
        .pipe(uglify())
        .pipe(jscrush())
        .pipe(rename('js1k.min.js'))
        .pipe(gulp.dest('./dest/'))
});
