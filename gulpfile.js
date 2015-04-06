var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var lab = require('gulp-lab');
var runSequence = require('run-sequence');

gulp.task('assets', function() {
  return gulp.src('src/client/assets/**/*.*')
    .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('styles', function() {
  return gulp.src('src/client/styles/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('dist/client/styles'));
});

gulp.task('scripts', function() {
  browserify('./src/client/scripts/index.jsx', {
    // entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: false
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist/client'));
});

gulp.task('template-index', function() {
  var cause = require('./src/cause.json');

  return gulp.src('src/client/templates/index.handlebars')
    .pipe(handlebars(cause))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('server-build', function() {
  return gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server'));
});

gulp.task('default', ['template-index', 'styles', 'assets', 'scripts']);

gulp.task('server-test', function() {
  return gulp.src('dist/server/**/*-spec.js')
    .pipe(lab('-c'));
});

gulp.task('server', function() {
  runSequence('server-build', 'server-test');
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});

gulp.task('watch-server', function () {
  gulp.watch('src/server/**/*.*', ['server-build']);
});