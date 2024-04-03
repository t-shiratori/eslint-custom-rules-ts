'use strict'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { plugin as eslintPluginExample } from './eslint-rules/out/index.js'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: ['src/**/*.ts'],
  ignores: ['**/*.config.js'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    example: eslintPluginExample,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    'example/enforce-foo-bar': 'error',
  },
})
