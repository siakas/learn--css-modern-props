const gulp = require('gulp')
const { serve } = require('./serve')
const { html } = require('./html')
const { styles } = require('./styles')
const { watch } = require('./watch')

/**
 * パブリックタスクとして登録
 * npm scripts を通じて `gulp foo` のように実行できるようになる
 * `yarn gulp foo` なら npm scripts 通さずに実行可
--------------------------------------------- */
exports.serve = serve
exports.html = html
exports.styles = styles

/**
 * 開発タスク
 * ローカルサーバの起動、各種ファイルの監視およびブラウザ自動更新
--------------------------------------------- */
exports.default = gulp.series(
  gulp.parallel(html, styles),
  gulp.parallel(serve, watch)
)
