module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      // Tailwind CSS 向けの設定
      { ignoreAtRules: ['tailwind', 'layer', 'apply'] },
    ],
    'function-no-unknown': null, // Dart Sass で不要なエラーが大量に出るため
  },
  ignoreFiles: ['**/node_modules/**'],
}
