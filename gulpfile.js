var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

/**
 * Concatenates and uglify all `src` files into `dest`, including inline source
 * maps.
 * 
 * @param {String}       dest Path of destination file
 * @param {Array|String} src  Path of source file(s)
 * 
 * @returns {Pipe} Returns the Gulp pipe
 */
function uglifyAll(dest, src) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(concat(path.basename(dest)))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dirname(dest)));
}

// .hbs -> .js
gulp.task('views', function () {
  return gulp.src('js/views/**/*.{handlebars,hbs}')
    .pipe(emberTemplates())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/views'));
});

// *.js -> vendor.js
gulp.task('vendor', function () {
  return uglifyAll('dist/vendor.js', [
    'js/libs/jquery/dist/jquery.js',
    'js/libs/handlebars/handlebars.js',
    'js/libs/ember/ember.js',
    'js/libs/ember-data/ember-data.js',
    'js/libs/ember-localstorage-adapter/localstorage_adapter.js',
  ]);
});

// *.js -> app.js
gulp.task('app', ['views'], function () {
  return uglifyAll('dist/app.js', [
    'dist/views/**',
    'js/application.js',
    'js/router.js'
  ]);
});

// Default task
gulp.task('default', ['vendor', 'app']);
