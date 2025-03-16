module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/no-unresolved': 'error',
    'comma-dangle': 'off',
    semi: 'off',
  },
};
