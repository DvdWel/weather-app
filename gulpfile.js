'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('./sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('serve', function() {
    browserSync.init({
        server: "../weather-app"
    });

    gulp.watch("../weather-app/scss/*.scss", ['sass']);
	gulp.watch("../weather-app/*.html").on('change', browserSync.reload);
	gulp.watch("../weather-app/*.css").on('change', browserSync.reload);
	gulp.watch("../weather-app/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);
