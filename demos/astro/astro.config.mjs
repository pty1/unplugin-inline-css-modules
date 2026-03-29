// @ts-check
import { defineConfig } from 'astro/config'
import inlineCSSModules from 'unplugin-inline-css-modules/astro'

export default defineConfig({
    integrations: [inlineCSSModules({inlineImport: false})],
    vite: {
    },
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    },
})
