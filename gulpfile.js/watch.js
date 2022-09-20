const gulp = require('gulp')
const { html } = require('./html')
const { styles } = require('./styles')
const config = require('../gulp.config.js')

/**
 * ファイルの監視
--------------------------------------------- */
const watch = () => {
  gulp.watch(config.pug.watchSrc, html)
  gulp.watch(config.sass.watchSrc, styles)
}

/**
 * エクスポート
--------------------------------------------- */
exports.watch = watch
