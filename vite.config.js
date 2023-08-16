import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import components from 'unplugin-vue-components/vite'
import { crx } from '@crxjs/vite-plugin'
import { ViteMinifyPlugin as minifyHtml } from 'vite-plugin-minify'

import manifest from './src/manifest.ts'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    components({ directoryAsNamespace: true }),
    crx({ manifest }),
    minifyHtml(),
  ],
  publicDir: './src/public',
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: {
        offscreen: './src/pages/offscreen.html',
      },
    },
  },
  resolve: {
    alias: {
      'enums': './src/enums',
      'utils': './src/utils',
      'store': './src/store',
      'pages': './src/pages',
      'assets': './src/assets',
      'scripts': './src/scripts',
      'components': './src/components',
      'composables': './src/composables',
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: '@use "/src/assets/sass/resources/index.sass" as *\n',
      },
    },
  },
  server: {
    strictPort: true,
    port: 3000,
    hmr: {
      clientPort: 3000,
    },
  },
})
