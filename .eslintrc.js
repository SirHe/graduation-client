module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 解决ESLint与Prettier格式冲突问题
    'space-before-function-paren': 'off',
    camelcase: 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-unused-expressions': 'off',
    'vue/no-mutating-props': 'warn'
  }
}
