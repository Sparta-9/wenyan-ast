module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    '@antfu/eslint-config-ts',
  ],
  plugins: [
    'jest',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn'
  },
}
