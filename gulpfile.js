/* gulpfile */

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpBrowserSync = require('browser-sync').create();
const gulpUseref = require('gulp-useref');
const gulpUglify = require('gulp-uglify-es').default;
const gulpCssnano = require('gulp-cssnano');
const gulpImagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const cache = require('gulp-cache');
const del = require('del');

/* Compiles .scss to .css */
function sass() {
	return gulp.src('./app/scss/**/*.scss')
		.pipe(gulpSass())
		.pipe(gulp.dest('./app/css'))
		.pipe(gulpBrowserSync.reload({
			stream : true
		}));
}

/* Browser Sync */
function browserSync() {
	gulpBrowserSync.init({
		server : {
			baseDir : 'app'
		},
	});
}

/* Concatenate and Minify CSS & JS */
function concatAndMinify() {
	return gulp.src('./app/*.html')
		.pipe(gulpUseref())
		.pipe(gulpIf('*.js', gulpUglify()))
		.pipe(gulpIf('*.css', gulpCssnano()))
		.pipe(gulp.dest('./dist'));
}

/* Minify images */
function imageMinify() {
	return gulp.src('./app/images/**/*')
		.pipe(cache(gulpImagemin()))
		.pipe(gulp.dest('./dist/images'));
}

/* Cleans distribution directory */
function cleanDist(cb) {
	del.sync('./dist');
	cb();
}

/* Clears gulp cache */
function clearCache(cb) {
	return cache.clearAll(cb);
}

/* Reload wrapper */
function reload(cb) {
	gulpBrowserSync.reload();
	cb();
}

/* Watch function */
function watch() {
	gulp.watch('./app/scss/**/*.scss', gulp.series(sass)); 
	gulp.watch('./app/*.html', reload);
	gulp.watch('./app/js/**/*.js', reload);
}


exports.build = gulp.series(cleanDist, gulp.parallel(sass, concatAndMinify, imageMinify));
exports.default = gulp.series(sass, gulp.parallel(browserSync, watch));