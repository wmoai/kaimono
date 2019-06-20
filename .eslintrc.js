var path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-hooks',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.json')
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
