var gulp           = require('gulp');
var pug            = require('gulp-pug');
var fastylus       = require('fa-stylus');
var stylus         = require('gulp-stylus');
var concat         = require('gulp-concat');
var koutoSwiss     = require('kouto-swiss');
var uglify         = require('gulp-uglify');
var inject         = require('gulp-inject');
var cssnano        = require('gulp-cssnano');
var plumber        = require('gulp-plumber');
var runSequence    = require('run-sequence');
var mainBowerFiles = require('main-bower-files');
var prefixer       = require('autoprefixer-stylus');
var browserSync    = require('browser-sync').create();

var srcPaths = {
  pug:     'src/*.pug',
  js:      'src/js/**/*.js',
  css:     'src/style/**/*.styl',
  mainCss: 'src/style/main.styl'
};

var buildPaths = {
  pug:   './www/',
  js:    'www/js/',
  css:   'www/css/',
  build: 'www/**/*'
}

gulp.task('watch', function() {
  gulp.watch(srcPaths.js,  ['js']);
  gulp.watch(srcPaths.pug, ['pug']);
  gulp.watch(srcPaths.css, ['stylus']);
});

gulp.task('pug', function() {
  gulp.src(srcPaths.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.pug))

  return gulp.start('inject-js');
});

gulp.task('stylus', function() {
  return gulp.src(srcPaths.mainCss)
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), fastylus()],
      compress: true
    }))
    .pipe(cssnano())
    .pipe(concat('index.min.css'))
    .pipe(gulp.dest(buildPaths.css))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(buildPaths.js))
    .pipe(browserSync.stream());

  return gulp.start('inject-js');
});

gulp.task('inject-js', function() {
  var bowerFiles = gulp.src(mainBowerFiles(), { read: false });
  var appFiles   = gulp.src(buildPaths.js + "*.js", { read: false });

  return gulp.src('./www/index.html')
    .pipe(plumber())
    .pipe(inject(bowerFiles, { name: 'bower', relative: true }))
    .pipe(inject(appFiles, { relative: true }))
    .pipe(gulp.dest(buildPaths.pug))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
        baseDir: "./www"
      }
  });
});

gulp.task('default', runSequence('stylus', 'pug', 'js', 'watch', 'inject-js', 'browser-sync'));
