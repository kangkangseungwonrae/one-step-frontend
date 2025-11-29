import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'prettier'
      )
    ),

    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(importPlugin),
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 기본 모듈
            'external', // 외부 라이브러리
            'parent', // 부모 파일
            'sibling', // 형제 파일
            'internal', // 내부 모듈
            'type', // 타입 파일
          ],
          pathGroups: [
            { pattern: '@/**', group: 'parent' }, // path 별칭이 있으면 parent 그룹으로 넣어줬다.
          ],
          pathGroupsExcludedImportTypes: ['type'], // type 그룹은 pathGroups 룰 제외하기 위해 넣었다.
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬
            caseInsensitive: true, // 대소문자 구분 없음
          },
          'newlines-between': 'always', // 그룹 사이에 빈 줄 추가
        },
      ],
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
]);
