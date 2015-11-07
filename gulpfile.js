var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
  return gulp.src('./public/styles/less/**/*.less')
    .pipe(less({
      paths: [
        '.',
        './public/jspm_packages/github/distros/bootstrap-less@3.3.9'
      ]
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['less'], function() {
  // place code for your default task here
});
