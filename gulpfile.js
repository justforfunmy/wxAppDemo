const gulp = require('gulp')
const del = require('del')
const path = require('path')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const jsonminify = require('gulp-jsonminify2')
const gutil = require('gulp-util')
const combiner = require('stream-combiner2');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")
const minifycss = require('gulp-minify-css')
const runSequence = require('run-sequence')
const jsonlint = require("gulp-jsonlint")

var colors = gutil.colors;
const handleError = function(err) {
  console.log('\n')
  gutil.log(colors.red('Error!'))
  gutil.log('fileName: ' + colors.red(err.fileName))
  gutil.log('lineNumber: ' + colors.red(err.lineNumber))
  gutil.log('message: ' + err.message)
  gutil.log('plugin: ' + colors.yellow(err.plugin))
};



gulp.task('watch', () => {
  gulp.watch('dist/**/*.scss', ['scss']);
  gulp.watch('dist/**/*.sass', ['scss']);
});

gulp.task('scss', () => {
  var combined = combiner.obj([
    gulp.src(['dist/**/*.{wxss,sass,scss}', '!./src/styles/**']),
    sass().on('error', sass.logError),
    autoprefixer([
      'iOS >= 8',
      'Android >= 4.1'
    ]),
    rename((path) => path.extname = '.wxss'),
    gulp.dest('pages')
  ]);

  combined.on('error', handleError);
});

gulp.task('scssPro', () => {
  var combined = combiner.obj([
    gulp.src(['dist/**/*.{wxss,sass,scss}', '!./src/styles/**']),
    sass().on('error', sass.logError),
    autoprefixer([
      'iOS >= 8',
      'Android >= 4.1'
    ]),
    minifycss(),
    rename((path) => path.extname = '.wxss'),
    gulp.dest('pages')
  ]);

  combined.on('error', handleError);
});

gulp.task('dev', ['scss','watch']);