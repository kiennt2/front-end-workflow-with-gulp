'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    //jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    path        = require('path'),
    concat      = require('gulp-concat'),
    csscomb     = require('gulp-csscomb'),          
    sourcemaps  = require('gulp-sourcemaps'),
    rigger      = require('gulp-rigger'),
    cssmin      = require('gulp-csso'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    rimraf      = require('rimraf'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/* Path Config
=================================================================================*/
path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'app/*.html',
        js: 'app/js/script.js',
        style: 'app/sass/**/*.*',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/*.html',
        template: 'app/template/*.html',
        js: 'app/js/script.js',
        style: 'app/sass/**/*.*',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build'
};

/*BUILD
=================================================================================*/

// HTML build
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


// JS build
gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        //.pipe(jshint())
        //.pipe(jshint.reporter('jshint-stylish'))
        //.pipe(jshint.reporter('fail'))
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


// Sass build
gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(csscomb())
        .pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

// IMG build
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

// Font build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// BOWER Components Build
gulp.task('bower:build', function () {
    gulp.src(['app/bower_components/**'])
        .pipe(gulp.dest('build/bower_components'));
});

// Clean
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'bower:build'
]);

/*=================================================================================*/


/* WATCH
=================================================================================*/
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
     watch([path.watch.template], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
/*=================================================================================*/


/* Server
=================================================================================*/
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9732,
    logPrefix: "_LOG_"
};

gulp.task('webserver', function () {
    browserSync(config);
});
/*=================================================================================*/

gulp.task('default', ['build', 'webserver', 'watch']);