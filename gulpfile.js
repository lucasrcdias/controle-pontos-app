var gulp = require('gulp');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var fastylus = require('fa-stylus');
var cssnano = require('gulp-cssnano');
var koutoSwiss = require('kouto-swiss');
var prefixer = require('autoprefixer-stylus');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');

var srcPaths = {
  css: 'src/style/**/*.styl',
  mainStyl: 'src/style/main.styl'
};

var buildPaths = {
  build: 'www/**/*',
  css: 'www/css/'
};

gulp.task('css', function() {
  gulp.src(srcPaths.mainStyl)
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), fastylus()],
      compress: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.css));
});

gulp.task('watch', function() {
  gulp.watch(srcPaths.css, ['css']);
});

gulp.task('browser-sync', function() {
  var files = [
    buildPaths.build
  ];

  browserSync.init(files, {
    server: {
      baseDir: './build/'
    },
  });
});

gulp.task('default', ['css', 'watch', 'browser-sync']);
