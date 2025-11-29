import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      'jsx-a11y': jsxA11Y,
      import: importPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...jsxA11Y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',

      'react/no-unstable-nested-components': [
        'warn',
        {
          allowAsProps: true,
        },
      ],
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'react/jsx-no-constructed-context-values': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-key': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'internal', 'type'],
          pathGroups: [{ pattern: '@/**', group: 'parent' }],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
  },
];
