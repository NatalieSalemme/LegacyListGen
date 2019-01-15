/* gulpfile */

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const autoprefix = require('gulp-autoprefixer');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const gulpIf = require('gulp-if');

// File Paths
const HTML_PATH = './app/**/*.html';
const SCSS_PATH = './app/scss/**/*.scss';
const CSS_PATH = './app/css/';
const JS_PATH = './app/js/**/*';
const IMG_PATH = './app/img/*';
const DIST_PATH = './dist/';

/* Compiles .scss to .css */
function compileSass() {
	return gulp.src(SCSS_PATH)
		.pipe(sass())
		.pipe(gulp.dest(CSS_PATH))
		.pipe(browserSync.reload({
			stream : true
		}));
}

/* Browser Sync */
function startBrowserSync() {
	browserSync.init({
		server : {
			baseDir : 'app'
		},
	});
}

/* Condenses CSS and JS tags in HTML files and moves to dist */
function htmlCssJs() {
	let autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];

	return gulp.src(HTML_PATH)
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cleanCSS({ rebase : false })))
		.pipe(gulpIf('*.css', autoprefix({
			browsers: autoprefixBrowsers,
			cascade: false
		})))
		.pipe(gulp.dest(DIST_PATH));
}

/* Minify images */
function imageMinify() {
	return gulp.src(IMG_PATH)
		.pipe(cache(imageMin()))
		.pipe(gulp.dest(DIST_PATH + '/img/'));
}

/* Cleans distribution directory */
function cleanDist(cb) {
	del.sync(DIST_PATH + '**/!(CNAME)');
	cb();
}

/* Clears gulp cache */
function clearCache(cb) {
	return cache.clearAll(cb);
}

/* Reload wrapper */
function reload(cb) {
	browserSync.reload();
	cb();
}

/* Watch function */
function watch() {
	gulp.watch(HTML_PATH, reload);
	gulp.watch(SCSS_PATH, gulp.series(compileSass)); 
	gulp.watch(JS_PATH, reload);
}

/*    Gulp Tasks   */

exports.cleanDist = gulp.series(cleanDist);

exports.clearCache = gulp.series(clearCache);

exports.build = gulp.series(cleanDist,
							compileSass,
	gulp.parallel(htmlCssJs,
				  imageMinify));

exports.default = gulp.series(compileSass, 
	gulp.parallel(startBrowserSync, 
				  watch));