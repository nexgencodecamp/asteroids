var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function(){
  gulp.src('./client/src')
    .pipe(webserver({
      host: '0.0.0.0',
      port: '8000',
      path: '/',
      livereload: true,
      fallback: 'index.html'
    }));
});
