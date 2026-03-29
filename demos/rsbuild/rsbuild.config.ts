import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import inlineCSSModules from '../../dist/rspack.mjs'

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [inlineCSSModules()],
    },
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
})
