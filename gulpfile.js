const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Set Default Gulp Task to be Serve
gulp.task('default', ['serve']);

// Watch Files & Serve in Browser
gulp.task('serve', ['sass'], function() {

  // Serve the Production Folder
  browserSync.init({
    server: './production'
  });

  // Watch All Files & Folders Within src and Reload on Change
  gulp.watch(['src/sass/*.scss'], ['sass']);
  gulp.watch(['src/*.html'], ['copyHTML']);
  gulp.watch(['src/js/*.js'], ['concatJS']);
});

// Compile Sass
gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('production/css'))
    .pipe(browserSync.stream());
});

// Concat JS Files in src Folder into a main.js File in Production Folder
gulp.task('concatJS', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('production/js'))
    .pipe(browserSync.stream());
});

// Copy All HTML Files in src to Production
gulp.task('copyHTML', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('production'))
    .pipe(browserSync.stream());
});

// Minify All HTML Files in Production Folder
gulp.task('minifyHTML', function() {
  gulp.src('production/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('production'));
});

// Minify style.css in Production Folder
gulp.task('minifyCSS', function() {
  gulp.src('production/css/style.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('production/css'));
});

// Minify main.js in Production Folder
gulp.task('minifyJS', function() {
  gulp.src('production/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('production/js'));
});

// Run All Minification Tasks
gulp.task('minify', ['minifyHTML', 'minifyCSS', 'minifyJS']);
