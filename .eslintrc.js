module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier', 'eslint:recommended'],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.tsx'] }],
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [1, { 'maximum': 1, 'when': 'multiline' }],
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  }
};
