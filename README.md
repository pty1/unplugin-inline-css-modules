# unplugin-inline-css-modules

[![npm](https://img.shields.io/npm/v/unplugin-inline-css-modules.svg)](https://www.npmjs.com/package/unplugin-inline-css-modules)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Zero-runtime scoped CSS, targeting any framework on any bundler.

A simple example:

```tsx
import { css } from 'unplugin-inline-css-modules'

const classes = css`
  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
  }
`

export const Button = () => <button className={classes.button}>Click me</button>
```

At build time, the CSS is extracted into a real CSS module. Existing PostCSS syntax, Tailwind `@apply` directives, and CSS tooling all work out of the box however they were configured in the bundler.

## Why

Frameworks like Vue have `<style scoped>`. The rest of us have been stuck choosing between separate `.module.css` files (context-switching) and CSS-in-JS libraries (runtime overhead, incompatible with PostCSS tooling).

This plugin gives you the best of both worlds: **co-located styles with zero runtime cost**. Under the hood it just generates CSS modules, so your entire CSS toolchain works without any changes.

## Install

```bash
npm install unplugin-inline-css-modules
```

## Setup

Add the plugin for your bundler:

<details>
<summary><b>Vite</b></summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import inlineCSSModules from 'unplugin-inline-css-modules/vite'

export default defineConfig({
  plugins: [inlineCSSModules()],
})
```

</details>

<details>
<summary><b>Rollup</b></summary>

```ts
// rollup.config.js
import inlineCSSModules from 'unplugin-inline-css-modules/rollup'

export default {
  plugins: [inlineCSSModules()],
}
```

</details>

<details>
<summary><b>Rolldown</b></summary>

```ts
// rolldown.config.js
import inlineCSSModules from 'unplugin-inline-css-modules/rolldown'

export default {
  plugins: [inlineCSSModules()],
}
```

</details>

<details>
<summary><b>Webpack</b></summary>

```ts
// webpack.config.js
import inlineCSSModules from 'unplugin-inline-css-modules/webpack'

export default {
  plugins: [inlineCSSModules()],
}
```

</details>

<details>
<summary><b>Rspack / Rsbuild</b></summary>

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import inlineCSSModules from 'unplugin-inline-css-modules/rspack'

export default defineConfig({
  tools: {
    rspack: {
      plugins: [inlineCSSModules()],
    },
  },
})
```

</details>

<details>
<summary><b>esbuild</b></summary>

```ts
import { build } from 'esbuild'
import inlineCSSModules from 'unplugin-inline-css-modules/esbuild'

build({
  plugins: [inlineCSSModules()],
})
```

</details>

<details>
<summary><b>Farm</b></summary>

Farm is an experimental target. There has not been thorough testing for functionality.

```ts
// farm.config.ts
import inlineCSSModules from 'unplugin-inline-css-modules/farm'

export default {
  vitePlugins: [inlineCSSModules()],
}
```

</details>

<details>
<summary><b>Bun</b></summary>

```ts
import inlineCSSModules from 'unplugin-inline-css-modules/bun'

Bun.build({
  plugins: [inlineCSSModules()],
})
```

</details>

### Framework Integrations

<details>
<summary><b>Next.js</b></summary>

```ts
// next.config.ts
import type { NextConfig } from 'next'
import inlineCSSModules from 'unplugin-inline-css-modules/next'

const nextConfig: NextConfig = {
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins.push(inlineCSSModules())
    return config
  },
}

export default nextConfig
```

> **Note:** SWC breaks some assumptions for virtual module resolution. As a workaround, CSS modules are cached in `node_modules/.cache/inline-css-modules/`. If you reinstall `node_modules`, remove the `.next` folder to clear stale references.

</details>

<details>
<summary><b>Nuxt</b></summary>

```ts
// nuxt.config.ts
import inlineCSSModules from 'unplugin-inline-css-modules/vite'

export default defineNuxtConfig({
  vite: {
    plugins: [inlineCSSModules()],
  },
})
```

</details>

<details>
<summary><b>Astro</b></summary>

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import inlineCSSModules from 'unplugin-inline-css-modules/astro'

export default defineConfig({
  integrations: [inlineCSSModules()],
})
```

</details>

<details>
<summary><b>SvelteKit</b></summary>

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import inlineCSSModules from 'unplugin-inline-css-modules/vite'

export default defineConfig({
  plugins: [inlineCSSModules(), sveltekit()],
})
```

</details>

## Usage Examples

### React

```tsx
import { css } from 'unplugin-inline-css-modules'

const classes = css`
  .root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

export const Root = () => (
  <div className={classes.root}>
    <button className={classes.button}>Click me</button>
  </div>
)
```

### Vue

```vue
<script setup lang="ts">
import { css } from 'unplugin-inline-css-modules'

const classes = css`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`
</script>

<template>
  <div :class="classes.container">
    <button :class="classes.button">Click me</button>
  </div>
</template>
```

### Solid

```tsx
import type { Component } from 'solid-js'
import { css } from 'unplugin-inline-css-modules'

const styles = css`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

const App: Component = () => (
  <div class={styles.container}>
    <button class={styles.button}>Click me</button>
  </div>
)

export default App
```

### Svelte

```svelte
<script lang="ts">
  import { css } from 'unplugin-inline-css-modules'

  const classes = css`
    .button {
      background-color: #1f1e33;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
    }
  `
</script>

<button class={classes.button}>Click me</button>
```

### Astro

```astro
---
import { css } from 'unplugin-inline-css-modules'

const classes = css`
  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
  }
`
---

<button class={classes.button}>Click me</button>
```

## How It Works

At build time, the plugin transforms your `css` tagged template literals into real CSS module imports:

```ts
// What you write:
const classes = css`
  .root {
    color: red;
  }
`

// What gets compiled:
import classes from 'virtual:inline-css-modules/App-0.module.css'
```

The CSS gets extracted into a virtual module and then processed through your bundler's normal CSS pipeline. This means PostCSS plugins, Tailwind `@apply`, preprocessors, and any other CSS tooling work exactly as they would with a regular `.module.css` file.

## Options

| Option         | Type                                                                                        | Default                            | Description                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `tagName`      | `string`                                                                                    | `'css'`                            | Template tag name to match. Useful for avoiding conflicts with other CSS-in-JS libraries.                       |
| `fileMatch`    | `RegExp`                                                                                    | `/\.(tsx\|jsx\|js\|vue\|svelte)$/` | Pattern for files to transform.                                                                                 |
| `extension`    | `'css' \| 'scss' \| 'sass' \| 'styl' \| 'less' \| (filename: string) => SupportedExtension` | `'css'`                            | CSS preprocessor to use. Can be a string or a function that returns the extension based on the filename.        |
| `inlineImport` | `boolean`                                                                                   | `true`                             | When `false`, generated imports are hoisted to the top of the file instead of replacing the declaration inline. |

## Caveats

**No string interpolation.** The `css` tag looks like a template literal, but it's a compile-time transform. The contents are moved into a real CSS module, so dynamic values can't work.

**Class variables are replaced at compile time.** The `const classes = css\`...\`` declaration is replaced with an import statement, so you can't reassign or manipulate the variable at runtime.

## Troubleshooting

**`css is not defined` or similar errors** -- Make sure the `tagName` option matches the tag you're using in your code. The plugin removes the import from `unplugin-inline-css-modules` and replaces the tagged template with a CSS module import. If the tag names don't match, the import gets removed but the template isn't transformed.

## License

[MIT](./LICENSE)
