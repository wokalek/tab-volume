# Contributing Guide

Hello! I'm really glad you want to help my little extension get better!

Please see the list below to better understand the structure of this repository:

- ⚡ [Vite](https://vitejs.dev) is used for assembly
- 🖖 [Vue](https://vuejs.org) and [Tailwind](https://tailwindcss.com) for the frontend
- 💪 [CRXJS](https://github.com/crxjs/chrome-extension-tools) for easier assembly of chrome extensions
- 🛍️ [pnpm](https://pnpm.io) as a package manager
- ✏️ [ESLint](https://typescript-eslint.io) for linting

## Localization

If you want to add localizations to the extension, they are located in the [`_locales`](_locales) folder. Just create a folder with your locale and translate language phrases.

## Build

To build the extension, run the `pnpm build` command and wait for the build to complete. After that, go to the Google Chrome extensions page, enable developer mode (if it is not already enabled) and load the unpacked extension, which is located in the `dist` folder.
