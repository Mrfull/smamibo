const gulp = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack-stream')
const ProvidePlugin = require('webpack-stream').webpack.ProvidePlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const eslint = require('gulp-eslint')

module.exports = function script() {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(webpack({
            mode: process.env.NODE_ENV,
            output: {
                filename: '[name].min.js',
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            plugins: [
                new CircularDependencyPlugin(),
                new DuplicatePackageCheckerPlugin(),
                new webpack.webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                }),
            ],
            resolve: {
                modules: ['node_modules'],
                alias: {
                    'owl.carousel': 'owl.carousel/dist/owl.carousel.min.js'
                }
            }
        }))
        .pipe(gulp.dest('build/js'))
}

