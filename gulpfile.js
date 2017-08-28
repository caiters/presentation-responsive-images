var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

gulp.task('css', function(){
  var cssSrc = 'css/sass/*.scss',
      cssDest = 'css';
  gulp.src(cssSrc, {base: 'css/sass'})
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write('maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(cssDest))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function(){
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch:html', function(){
  gulp.watch(['./*.html'], ['html'])
});

gulp.task('watch:css', ['css'], function(){
  gulp.watch('css/**/*.scss', ['css']);
});

gulp.task('default', ['watch:css', 'connect', 'watch:html']);
