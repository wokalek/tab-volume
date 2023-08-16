// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import defaultConfig from 'tailwindcss/stubs/config.full.js'

import type { Config } from 'tailwindcss'

export default {
  plugins: [],
  content: [
    './src/pages/popup.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        trebuchet: ['Trebuchet MS', defaultConfig.theme.fontFamily.sans],
        arial: ['Arial', defaultConfig.theme.fontFamily.sans],
      },
    },
  },
} satisfies Config
