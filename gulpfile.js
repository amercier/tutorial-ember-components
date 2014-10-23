var gulp = require('gulp');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

// .hbs -> .js
gulp.task('views', function () {
  return gulp.src('js/views/**/*.{handlebars,hbs}')
    .pipe(emberTemplates())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/views'));
});

// *.js -> vendor.js
gulp.task('vendor', function () {
  return gulp.src([
    'js/libs/jquery/dist/jquery.js',
    'js/libs/handlebars/handlebars.js',
    'js/libs/ember/ember.js',
    'js/libs/ember-data/ember-data.js',
    'js/libs/ember-localstorage-adapter/localstorage_adapter.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});


// *.js -> app.js
gulp.task('app', ['views'], function () {
  return gulp.src([
    'dist/views/**',
    'js/application.js',
    'js/router.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

// Default task
gulp.task('default', ['vendor', 'app']);
