'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
	return gulp.src('./css/less/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());;
});

gulp.task('browser-sync', ['less'], function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch("css/less/*.less", ['less']);
	gulp.watch(['./*.html', './framhald/**/*', './slides/*.html', './assignments/*.html', './scripts/*.js', './css/*.css']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'less']);
