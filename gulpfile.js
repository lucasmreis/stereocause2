var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
 
gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('template-index', function () {
  var cause = require('./src/cause.json');

  return gulp.src('src/templates/index.handlebars')
    .pipe(handlebars(cause))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['template-index', 'styles']);