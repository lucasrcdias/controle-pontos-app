var gulp        = require('gulp');
var pug         = require('gulp-pug');
var stylus      = require('gulp-stylus');
var concat      = require('gulp-concat');
var koutoSwiss  = require('kouto-swiss');
var cssnano     = require('gulp-cssnano');
var plumber     = require('gulp-plumber');
var prefixer    = require('autoprefixer-stylus');
var browserSync = require('browser-sync').create();
var gcmq        = require('gulp-group-css-media-queries');

var srcPaths = {
  pug: 'src/pug/*.pug',
  stylus: 'src/stylus/**/*.styl',
  mainStyl: 'src/stylus/main.styl'
};

var buildPaths = {
  pug: 'build/',
  build: 'build/**/*',
  stylus: 'build/css/'
}

gulp.task('watch', function() {
  gulp.watch(srcPaths.pug, ['pug']);
  gulp.watch(srcPaths.stylus, ['stylus']);
});

gulp.task('pug', function() {
  return gulp.src(srcPaths.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.pug))
    .pipe(browserSync.stream());
});

gulp.task('stylus', function() {
  return gulp.src(srcPaths.mainStyl)
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer()],
      compress: true
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(buildPaths.stylus))
    .pipe(browserSync.stream());
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

gulp.task('default', ['browser-sync', 'stylus', 'pug', 'watch']);
