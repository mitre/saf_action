import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import n from 'eslint-plugin-n';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'lib/**'],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  unicorn.configs.recommended,
  stylistic.configs.customize({
    braceStyle: '1tbs',
    indent: [2, { SwitchCase: 1 }],
    semi: true,
    quoteProps: 'as-needed',
    quotes: 'single',
  }),
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'vitest.config.ts'],
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      unicorn,
      n,
    },
    rules: {
      curly: 'error',
      'prefer-object-has-own': 'error',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'unicorn/filename-case': ['error', { case: 'snakeCase' }],
      'unicorn/no-null': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
]);
