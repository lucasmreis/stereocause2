var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('assets', function() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
  browserify('./src/scripts/index.jsx', {
    // entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: false
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('template-index', function () {
  var cause = require('./src/cause.json');

  return gulp.src('src/templates/index.handlebars')
    .pipe(handlebars(cause))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['template-index', 'styles', 'assets', 'scripts']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});