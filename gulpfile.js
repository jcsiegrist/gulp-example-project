'use strict';

var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

// sass
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

// js
var babel = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var jsSource = './_js/app.js';
var sassSource = './_scss/style.scss';

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
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(livereload());
});

gulp.task('sass', function() {
    gulp.src(sassSource)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});


gulp.task('default', ['js', 'sass'], function() {
    livereload.listen();
    gulp.watch(sassSource, ['sass']);
    gulp.watch(jsSource, ['js']);
});
