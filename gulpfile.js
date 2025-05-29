const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const connect = require('gulp-connect')

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css'
  },
  views: {
    src: 'src/pug/**/*.pug',
    dest: 'dist'
  }
}

gulp.task('clean', () => del(['dist']))

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload())
})

gulp.task('views', () => {
  return gulp
    .src(paths.views.src)
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(connect.reload())
})

gulp.task('watch', () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
  gulp.watch(paths.styles.src, gulp.series('styles'))
  gulp.watch(paths.views.src, gulp.series('views'))
})

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'views')))
