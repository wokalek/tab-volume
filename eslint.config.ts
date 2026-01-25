import { fileURLToPath } from 'node:url'

import { defineConfig } from 'eslint/config'

import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import js from '@eslint/js'
import json from '@eslint/json'
import { includeIgnoreFile } from '@eslint/compat'

import autoImport from './.eslintrc-auto-import.json'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  { files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,vue}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: { ...globals.browser, ...globals.webextensions, ...autoImport.globals } } },
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],
  stylistic.configs.recommended,
  { files: ['src/**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { files: ['src/**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    rules: {
      'require-await': 'error',
      'no-restricted-syntax': ['error', { selector: 'TSEnumDeclaration[const=true]' }],
      'vue/max-attributes-per-line': ['error', { singleline: { max: 5 }, multiline: { max: 1 } }],
      'vue/no-v-html': 'off',
    },
  },
])
