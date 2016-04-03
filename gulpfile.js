var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('default', ['watch']);

gulp.task('scripts', function() {
  return gulp.src(
    [
      'src/ng/app.module.js',
      'src/ng/app.config.js',
      'src/ng//utils/utils.module.js',
      'src/ng/utils/*.js',
      'src/ng/ui/ui.module.js',
      'src/ng/ui/*.js',
    ]
    )
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('watch', function() {
  gulp.watch('src/ng/**/*.js', ['scripts']);
  gulp.watch('src/styles/**/*.scss', ['sass']);
});
