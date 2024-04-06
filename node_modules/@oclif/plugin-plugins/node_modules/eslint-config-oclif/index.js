module.exports = {
  extends: [
    'eslint:recommended',
    'xo-space',
    'plugin:n/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: [
    'n',
    'mocha',
    'unicorn',
  ],
  rules: {
    'capitalized-comments': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'default-case': 0,
    'no-multi-spaces': 0,
    'n/shebang': 0,
    curly: 0,
    indent: ['error', 2, {SwitchCase: 0, MemberExpression: 0}],
    quotes: ['error', 'single', {avoidEscape: true}],
    semi: ['error', 'never'],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'warn',
    'logical-assignment-operators': 'off',
  },
  globals: {
    describe: true,
    it: true,
  },
}
