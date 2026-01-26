import path from 'node:path'

import { defineConfig } from 'vite'

import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import zip from 'vite-plugin-zip-pack'
import svgLoader from 'vite-svg-loader'
import vueComponents from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import tailwindAutoReference from 'vite-plugin-vue-tailwind-auto-reference'
import tailwindcss from '@tailwindcss/vite'

import manifest from './manifest.config.ts'
import pkg from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`,
      '~~': `${path.resolve(__dirname)}`,
    },
  },
  plugins: [
    vue(),
    vueComponents(),
    svgLoader({ defaultImport: 'url' }),
    autoImport({
      vueTemplate: true,
      eslintrc: { enabled: true },
      imports: [
        'vue',
        { from: 'lodash-es', imports: [{ name: '*', as: '_' }], typeFrom: '@types/lodash-es' },
        { from: 'p-memoize', imports: [{ name: 'default', as: 'pMemoize' }] },
        { from: 'xoid', imports: [{ name: '*', as: 'xoid' }] },
        { from: '@xoid/vue/useAtom', imports: ['useAtom'] },
      ],
      dirs: [
        'src/types/**',
        'src/enums/**',
        'src/utils/**',
        'src/store/**',
        'src/composables/**',
      ],
    }),
    tailwindAutoReference('./src/assets/css/vendors/tailwind.css') as unknown as import('vite').PluginOption,
    tailwindcss(),
    crx({ manifest }),
    zip({ outDir: 'build', outFileName: `${pkg.name}-${pkg.version}.zip`, filter: (_, filePath) => !filePath.startsWith('dist\\.vite') }),
  ],
  build: {
    minify: 'terser',
    target: 'chrome116',
    rollupOptions: {
      input: {
        offscreen: 'src/pages/offscreen.html',
        options: 'src/pages/options.html',
      },
    },
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
