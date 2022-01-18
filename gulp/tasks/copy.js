const gulp = require('gulp')

module.exports = function fonts() {
    return gulp.src(['src/docs/*', 'src/php/*'], { base: 'src/' })
        .pipe(gulp.dest('build/'))
}
