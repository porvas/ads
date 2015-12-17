// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['app/footer/*.js',
        'app/search_bar/*.js', 'app/common/adthumb/*.js'])
      .pipe(concat('mylibs.js'))
      .pipe(gulp.dest('app/js'));
});
 // Default Task
gulp.task('default', ['scripts']);