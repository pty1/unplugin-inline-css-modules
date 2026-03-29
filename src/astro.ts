import type { PluginConfig } from './index'
import unplugin from './index'
import type { AstroIntegration } from 'astro'

export default function (options: PluginConfig = {}) {
  return <AstroIntegration>{
    name: 'unplugin-inline-css-modules',
    hooks: {
      'astro:config:setup': async astro => {
        astro.updateConfig({
          vite: {
            plugins: [
              unplugin.vite({
                ...options,
                fileMatch:
                  options.fileMatch ?? /\.(tsx|jsx|js|vue|svelte|astro)$/,
              }) as Plugin,
            ],
          },
        })
      },
    },
  }
}

export { css } from './index'
export type { PluginConfig } from './index'
