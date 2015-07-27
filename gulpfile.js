var gulp = require('gulp');
var gutil = require('gulp-util');
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
  gutil.log(gutil.colors.green('Client building environment: '), gutil.colors.bgGreen(gutil.env['env']));

  browserify('./src/client/scripts/index.jsx', {
    // entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: gutil.env['env'] === 'production' ? false : true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(gutil.env['env'] === 'production' ? uglify() : gutil.noop())
  .pipe(gulp.dest('dist/client'));
});

gulp.task('template-index', function() {
  var cause = require('./src/cause.json');
  cause.production = gutil.env['env'] === 'production';

  return gulp.src('src/client/templates/index.handlebars')
    .pipe(handlebars(cause))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('server-build', function() {
  gutil.log(gutil.colors.green('Server building environment: '), gutil.colors.bgGreen(gutil.env['env']));

  return gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server'));
});

+gulp.task('client', ['template-index', 'styles', 'assets', 'scripts']);

gulp.task('server-test', function() {
  return gulp.src('dist/server/**/*-spec.js')
    .pipe(lab('-c -v'));
});

gulp.task('server', function() {
  runSequence('server-build', 'server-test');
});

gulp.task('default', ['client', 'server']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});

gulp.task('watch-server', function () {
  gulp.watch('src/server/**/*.*', ['server-build']);
});