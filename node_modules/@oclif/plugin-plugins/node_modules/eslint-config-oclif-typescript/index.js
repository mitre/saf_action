module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:n/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:perfectionist/recommended-natural',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-unresolved': 'error',
    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'no-unused-expressions': 'off',
    'no-useless-constructor': 'off',
    'perfectionist/sort-classes': [
      'error',
      {
        groups: [
          'index-signature',
          'static-property',
          'property',
          'private-property',
          'constructor',
          'static-method',
          'static-private-method',
          ['get-method', 'set-method'],
          'method',
          'private-method',
          'unknown',
        ],
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'valid-jsdoc': ['warn', {requireParamType: false, requireReturnType: false}],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
