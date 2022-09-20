module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': [
      true, // g.below() 等、Dart Sass の Mixin 呼び出しでエラーが出るのを回避
      {
        ignoreFunctions: ['/^g\\..+/'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      // Tailwind CSS 向けの設定
      { ignoreAtRules: ['tailwind', 'layer', 'apply'] },
    ],
    'function-no-unknown': [
      true,
      // Tailwind CSS 向けの設定
      { ignoreFunctions: ['theme', 'screen'] },
    ],
  },
  ignoreFiles: ['**/node_modules/**'],
}
