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
var prefixer       = require('autoprefixer-stylus');
var mainBowerFiles = require('main-bower-files');

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
  gulp.watch(srcPaths.js,  ['js',     'inject-js']);
  gulp.watch(srcPaths.pug, ['pug',    'inject-js']);
  gulp.watch(srcPaths.css, ['stylus', 'inject-js']);
});

gulp.task('pug', function() {
  return gulp.src(srcPaths.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.pug));
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
    .pipe(gulp.dest(buildPaths.css));
});

gulp.task('js', function() {
  return gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(buildPaths.js));
});

gulp.task('inject-js', function() {
  var bowerFiles = gulp.src(mainBowerFiles(), { read: false });
  var jsFiles    = gulp.src(buildPaths.js, { read: false });

  return gulp.src('./www/index.html')
    .pipe(plumber())
    .pipe(inject(bowerFiles, { name: 'bower', relative: true }))
    .pipe(inject(jsFiles))
    .pipe(gulp.dest(buildPaths.pug));
});

gulp.task('default', ['stylus', 'pug', 'js', 'inject-js', 'watch']);
