module.exports = {
  browser: {
    root: 'dist/',
    port: 8801,
    startPath: '/',
  },

  pug: {
    src: ['src/pug/pages/**/!(_)*.pug'],
    watchSrc: 'src/pug/**/*.pug',
    dest: 'dist/',
  },

  sass: {
    src: ['src/sass/**/*.scss', '!src/sass/**/libs/**/*.scss'],
    watchSrc: 'src/sass/**/*.{scss,css}',
    dest: 'dist/assets/styles',
  },
}
