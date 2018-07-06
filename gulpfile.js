var fs = require('fs');
var gulp = require('gulp');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var path = require('path');
var sass = require('gulp-sass');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var gs		= require('gulp-selectors');
var browserSync = require('browser-sync').create();

var paths = {
    data: './app/_data/'
  };
  
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('styles', function () {
    var main = gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(sourcemaps.write('../maps/css/'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));


    return merge(main);

});

gulp.task('images', function () {
    gulp.src('app/img/**/*')
      .pipe(imagemin())
      .pipe(flatten({ includeParents: [1, 2] }))
      .pipe(gulp.dest('dist/img'))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        ghostMode: {
            scroll: true
        }
    });
});

gulp.task('scripts', function () {
    var vendors = gulp.src([
            'app/js/vendors/jquery-3.3.1.min.js',
            'app/js/vendors/jquery.ba-throttle-debounce.min.js',
            'app/js/vendors/moment.min.js',
            'app/js/vendors/popper.min.js',
            'app/js/vendors/bootstrap.min.js',
            'app/js/vendors/slick.min.js',
            'app/js/vendors/daterangepicker.min.js'
        ])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps/js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));

    var pages = gulp.src('app/js/pages/*.js')
       .pipe(sourcemaps.init({ loadMaps: true }))
       .pipe(plumber({
           errorHandler: function (error) {
               console.log(error.message);
               this.emit('end');
           }
       }))
       .pipe(gulp.dest('dist/js/'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(sourcemaps.write('../maps/js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    var plugins = gulp.src('app/js/plugins/*.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/js/'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(sourcemaps.write('../maps/js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    var customs = gulp.src('app/js/custom/*.js')
       .pipe(sourcemaps.init({ loadMaps: true }))
       .pipe(plumber({
           errorHandler: function (error) {
               console.log(error.message);
               this.emit('end');
           }
       }))
       .pipe(concat('customs.js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(sourcemaps.write('../maps/js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    return merge(vendors, customs, pages, plugins);

});

gulp.task('pages', function () {
    gulp.src('app/*.pug')
    .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync(paths.data + path.basename(file.path) + '.json'))
        }))
        .pipe(pug({ pretty: true }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }));

});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('mcn', function() {
    return gulp.src(['dist/**/*.css', 'dist/**/*.js', 'dist/**/*.html'])
        .pipe(gs.run())
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/**/*.pug', ['pages']);
    gulp.watch('app/fonts/*', ['fonts']);
    gulp.watch('app/img/**/*', ['images']);  
});

gulp.task('default', ['styles', 'images', 'scripts', 'fonts', 'pages']);