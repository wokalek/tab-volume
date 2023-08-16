module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: [
    'dist',
  ],
  rules: {
    'func-call-spacing': 0,
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 0,
    'vue/singleline-html-element-content-newline': 0,
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'quote-props': ['error', 'consistent'],
    'vue/max-attributes-per-line': ['error', {
      singleline: 6,
    }],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/comma-dangle': ['error', 'always-multiline'],
  },
}
