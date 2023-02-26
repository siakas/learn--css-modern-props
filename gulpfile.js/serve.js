const browser = require('browser-sync')
const ssi = require('browsersync-ssi')
const config = require('../gulp.config')

/**
 * ローカルサーバ起動
--------------------------------------------- */
const serve = (done) => {
  browser({
    server: config.browser.root,
    port: 8801,
    startPath: config.browser.startPath,
    ghostMode: false,
    open: true,
    notify: false,

    // SSI の利用
    middleware: ssi({
      baseDir: config.browser.root,
      ext: '.html',
    }),
  })
  done()
}

/**
 * エクスポート
--------------------------------------------- */
exports.serve = serve
