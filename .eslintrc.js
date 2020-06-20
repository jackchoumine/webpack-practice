/*
 * @Description: eslint 配置
 * @Date: 2020-06-18 01:25:40
 * @Author: JackChouMine
 * @LastEditTime: 2020-06-21 05:24:25
 * @LastEditors: JackChouMine
 */
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'vue/html-self-closing': false,
    'vue/multiline-html-element-content-newline': false,
    'vue/max-attributes-per-line': false,
    'spaced-comment': ['error', 'always'],
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
