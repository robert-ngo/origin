var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var util          = require('gulp-util');
var sourceMaps    = require('gulp-sourcemaps');
var shell         = require('gulp-shell');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var fs            = require('fs');
var config        = require('./GulpConfig');

var src = {
  scss: ['./scss/**/*.scss', './scss/*.scss'],
  css: './css',
  js_src: './js/js-src/*.js',
  js: './js'
}

/**
 * Gulp task to generate CSS from SCSS files
 */
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(sourceMaps.init())
    .pipe(sass({
      noCache: true,
      outputStyle: "nested",
      loadPath: './css/*',
      sourceMap: true
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}))
    .pipe(notify({
      title: "SASS Complied",
      message: "Your CSS files are ready, Commander.",
      onLast: true
    }))
    ;
});

gulp.task('script', function() {
  return gulp.src(src.js_src)
    .pipe(gulp.dest(src.js))
    .pipe(reload({ stream: true }))
    .pipe(notify({
      title: "JS Minified",
      message: "Your JS files is ready, Sir",
      onLast: true
    }))
})

/**
 * Gulp task for executing Drush
 */
gulp.task('drush', function() {
  return gulp.src('', { read: false})
    .pipe(shell([
      'drush cr'
    ]))
    .pipe(notify({
      title: "Cache rebuild",
      message: "'drush cache-rebuild' has just run, My Lord",
      onLast: true
    }))
    .pipe(reload({stream: true}))
});

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    port: config.browserSync.port,
    proxy: config.browserSync.hostname,
    injectChanges: true
  });
})

gulp.task('watch', function() {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js_src, ['script']);
  gulp.watch('_static/*.html', ['sass']);
  gulp.watch('templates/**/*.twig', ['drush']);
  gulp.watch('**/*.yml', ['drush']);
  gulp.watch('**/*.theme', ['drush']);
})

gulp.task('default', ['browser-sync', 'watch']);
