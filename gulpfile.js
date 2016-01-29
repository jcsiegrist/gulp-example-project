'use strict';

var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

// sass
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sprites = require('postcss-sprites').default;
var sass = require('gulp-sass');
var spriteOpts = {
    stylesheetPath: './css',
    spritePath: './img/'
};

// js
var babel = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var jsSource = './_js/app.js';
var sassSource = './_scss/**/*.scss';



gulp.task('js', function() {
    var bundler = browserify(jsSource, {
            debug: true
        })
        .transform(babel, {
            presets: ['es2015']
        });

    return bundler
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify().on('error', sass.logError))
        .pipe(gulp.dest('./js'))
        .pipe(livereload());
});

gulp.task('sass', function() {
    gulp.src(sassSource)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer,
                sprites(spriteOpts)
            ])
        )
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});


gulp.task('default', ['js', 'sass'], function() {
    livereload.listen();
    gulp.watch(sassSource, ['sass']);
    gulp.watch(jsSource, ['js']);
});
