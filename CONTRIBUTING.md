# Contributing Guide

Hello! I'm so glad you want to help improve my small extension!

Please see the list below to better understand the structure of this repository:

- ⚡ [CRXJS](https://crxjs.dev) and [Vite](https://vitejs.dev) for easier assembly of chrome extensions
- 🖖 [Vue](https://vuejs.org) and [Tailwind](https://tailwindcss.com) for the frontend
- 🦑 [xoid](https://xoid.dev) as state manager
- 🛍️ [pnpm](https://pnpm.io) as a package manager
- ✏️ [ESLint](https://eslint.org) for linting

Please use the [Conventional Commits](https://www.conventionalcommits.org/) to formalize your commits!

## Develop

```bash
pnpm install
```

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

Once built, go to the Google Chrome extensions page, enable developer mode and load the unpacked extension, which is located in the `dist` folder.
