var gulp = require('gulp');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');
var uglify = require('gulp-uglifyjs');

gulp.task('default', function () {
  gulp.src('./templates/**/*.{handlebars,hbs}')
    .pipe(emberTemplates())
    .pipe(concat('templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/dist'));
});
