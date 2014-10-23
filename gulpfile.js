var gulp = require('gulp');
var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');

gulp.task('default', function () {
  gulp.src('./templates/**/*.{handlebars,hbs}')
    .pipe(emberTemplates())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist'));
});
