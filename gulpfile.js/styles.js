const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify')
const sassGlob = require('gulp-sass-glob-use-forward')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const browser = require('browser-sync')
const config = require('../gulp.config')

/**
 * 設定
--------------------------------------------- */
const PROCESSORS = [autoprefixer()]
const SASS_OPTIONS = {
  outputStyle: 'expanded',
  includePaths: ['src/sass'], // ルートディレクトリを includePaths で指定しておくと、@use の後の相対パスを省略可能
}

/**
 * Sass のコンパイル処理
--------------------------------------------- */
const styles = () => {
  return gulp
    .src(config.sass.src, { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(
      sass(SASS_OPTIONS).on(
        'error',
        notify.onError((error) => error.message)
      )
    )
    .pipe(postcss(PROCESSORS))
    .pipe(gulp.dest(config.sass.dest, { sourcemaps: './' }))
    .pipe(browser.reload({ stream: true }))
}

/**
 * エクスポート
--------------------------------------------- */
exports.styles = styles
