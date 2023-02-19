# Vue3 Template

## Features

### Frameworks

- [Vue3](https://vuejs.org/) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.

### UI Frameworks

- [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons) - Use any icons with Pure CSS for UnoCSS.
  - [Iconify](https://github.com/iconify/iconify) - Universal icon framework.
  - [icones](https://icones.netlify.app/) - Icon Explorer with Instant searching, powered by Iconify

### Plugins

- [Vue Router](https://router.vuejs.org/)
  - [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) - File system based route generator for Vite
- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support
  -  [Pinia Persists](https://github.com/ouduidui/pinia-persists) - A pinia plugin for state persist.
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - components auto import
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [VueUse](https://vueuse.org/) - collection of useful composition APIs

### Coding Style

- Use Composition Api with [`<script setup>` SFC syntax](https://vuejs.org/api/sfc-script-setup.html).
- [Eslint](https://eslint.org/) with [@ouduidui/eslint-config](https://github.com/ouduidui/eslint-config).

### Dev Tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) - Unit testing powered by Vite
- [Cypress](https://www.cypress.io/) - E2E testing
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager

## Usage

### Clone to local

```base
npx degit ouduidui/vue3-template my-app
```

### Development

```bash
# install dependencies
pnpm i
# run dev server
pnpm dev
```
