const gulp = require('gulp')
const { styles } = require('./styles')
const config = require('../gulp.config.js')

/**
 * ファイルの監視
--------------------------------------------- */
const watch = () => {
  gulp.watch(config.sass.watchSrc, styles)
}

/**
 * エクスポート
--------------------------------------------- */
exports.watch = watch
