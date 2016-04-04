var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var gulpDocs = require('gulp-ngdocs');

gulp.task('default', ['scripts','css','watch']);

gulp.task('scripts', function() {
  return gulp.src(
    [
      './src/ng/app.module.js',
      './src/ng/app.config.js',
      './src/ng/app.controller.js',
      './src/ng//utils/utils.module.js',
      './src/ng/utils/*.js',
      './src/ng/ui/ui.module.js',
      './src/ng/ui/*.js',
    ]
    )
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});
 
gulp.task('css', function () {
  return gulp.src('./src/styles/**/*.css')
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('docs', [], function () {
  return gulp.src('./src/ng/**/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'));
});

gulp.task('watch', function() {
  gulp.watch('./src/ng/**/*.js', ['scripts']);
  gulp.watch('./src/styles/**/*.css', ['css']);
});
