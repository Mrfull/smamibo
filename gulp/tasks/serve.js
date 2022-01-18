const gulp = require('gulp')

const imageMinify = require('./imageMinify')
const svgSprite = require('./svgSprite')
const styles = require('./styles')
const pug2html = require('./pug2html')
const script = require('./script')
const copy = require('./copy')
const copyDependencies = require('./copyDependencies')
const connect = require('gulp-connect-php')

const browserSync = require('browser-sync').create()
// const browserSync = require('browser-sync');

function readyReload(cb) {
    browserSync.reload()
    cb()
}

module.exports = function serve(cb) {
    //connect.server({}, function (){
        browserSync.init({
            server: 'build',
            notify: false,
            open: true,
            cors: true
        })
    // });



    gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
    gulp.watch('src/img/sprite/*.svg', gulp.series(svgSprite, readyReload))
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(browserSync.stream()).on('end', cb)))
    gulp.watch('src/js/**/*.js', gulp.series(script, readyReload))
    gulp.watch('src/pages/**/*.pug', gulp.series(pug2html, readyReload))
    gulp.watch('src/php/**/*.php', gulp.series(copy, readyReload))
    gulp.watch('src/json/**/*.json', gulp.series(copy, readyReload))

    gulp.watch('package.json', gulp.series(copyDependencies, readyReload))

    return cb()
}
