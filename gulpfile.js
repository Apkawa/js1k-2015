var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jscrush = require('gulp-jscrush');
var rename = require('gulp-rename');


gulp.task('default', function() {
    // place code for your default task here
    gulp.src("./js1k_uncompress.js")
        .pipe(uglify())
        .pipe(jscrush())
        .pipe(rename('js1k.min.js'))
        .pipe(gulp.dest('./dest/'))
});
