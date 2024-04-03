'use strict'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { customRulePlugin } from './eslint-rules/out/index.js'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: ['src/**/*.ts'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    custom_rules: customRulePlugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    'custom_rules/enforce-foo-bar': 'error',
  },
})
