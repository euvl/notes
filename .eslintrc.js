module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-multi-spaces': [
      'error', {
        exceptions: {
          'ImportDeclaration': true
        }
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
