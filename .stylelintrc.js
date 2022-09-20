module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      // Tailwind CSS 向けの設定
      { ignoreAtRules: ['tailwind', 'layer', 'apply'] },
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
