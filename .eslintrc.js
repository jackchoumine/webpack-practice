/*
 * @Description: eslint 规则
 * @Date: 2020-06-26 03:12:50 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-03-31 23:59:56 +0800
 * @LastEditors : JackChou
 */
/*
"eslint": "^7.6.0",
"eslint-plugin-vue": "^6.2.2",
"babel-eslint": "^10.1.0",
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  plugins: ['vue'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // NOTE 异步加载路由报错：Parsing error: Unexpected token import
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '2018',
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    semi: [2, 'never'],
    'comma-dangle': [1, 'only-multiline'],
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 强制一行的最大长度
    'max-len': [1, 100],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'no-var': 2,
    'prefer-const': 2,
    'spaced-comment': [2, 'always'],
    'vue/require-name-property': 2,
    'vue/multiline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-indent': [
      2,
      'tab',
      {
        attribute: 4,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // https://eslint.vuejs.org/rules/attributes-order.html
    'vue/attributes-order': [
      2,
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/order-in-components': [
      2,
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
}
