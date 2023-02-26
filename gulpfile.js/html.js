const gulp = require('gulp')
const fs = require('fs')
const pug = require('gulp-pug')
const pugGlobbing = require('pug-include-glob')
const data = require('gulp-data')
const notify = require('gulp-notify')
const prettier = require('gulp-prettier')
const browser = require('browser-sync')
const config = require('../gulp.config')

/**
 * 関数定義
--------------------------------------------- */
// JSON データの読み込み
const readJSON = (path) => {
  return JSON.parse(fs.readFileSync(path))
}

/**
 * 設定
--------------------------------------------- */
const PUG_OPTIONS = {
  plugins: [pugGlobbing()],
  doctype: 'html',
  pretty: true,
  basedir: 'src/pug', // ルート相対で include や extends を利用するためにルートパスを指定
}
const LOAD_DATA = {
  SHEETS: readJSON('src/json/articles.json'),
}

/**
 * Pug のコンパイル処理
--------------------------------------------- */
const html = () => {
  return gulp
    .src(config.pug.src)
    .pipe(data(() => LOAD_DATA))
    .pipe(
      pug(PUG_OPTIONS).on(
        'error',
        notify.onError((error) => error.message)
      )
    )
    .pipe(prettier())
    .pipe(gulp.dest(config.pug.dest))
    .pipe(browser.reload({ stream: true }))
}

/**
 * エクスポート
--------------------------------------------- */
exports.html = html
