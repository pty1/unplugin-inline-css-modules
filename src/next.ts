// WebPack / swc opportunistically caches resolutions so we have to
// register a custom loader that gives back the source instead.

import { createWebpackPlugin } from 'unplugin'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import type { PluginConfig } from './index'
import { unpluginFactory } from './index'

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : fileURLToPath(new URL('.', import.meta.url))
const LOADER_PATH = resolve(_dirname, 'loader.cjs')

const PLUGIN_NAME = 'inline-css-modules'

// const virtualModulePath = 'inline-css-modules/virtual'
// const isVirtualModule = (module: { resource?: string }) =>
//   module.resource?.includes?.(virtualModulePath) ?? false

export default function (options: PluginConfig = {}) {
  const plugin = createWebpackPlugin(unpluginFactory)(options) as {
    apply: (compiler: unknown) => void
  }
  const originalApply = plugin.apply.bind(plugin)
  plugin.apply = (compiler: unknown) => {
    originalApply(compiler)
    const wp = compiler as {
      hooks: {
        compilation: {
          tap: (name: string, fn: (compilation: unknown) => void) => void
        }
      }
    }

    wp.hooks.compilation.tap(PLUGIN_NAME, (compilation: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = compilation as any
      const NormalModule = c.compiler?.webpack?.NormalModule

      NormalModule.getCompilationHooks(compilation).beforeLoaders.tap(
        PLUGIN_NAME,
        (loaders: { loader: string }[], module: { resource?: string }) => {
          loaders.push({
            loader: LOADER_PATH,
          })
        }
      )
    })
  }
  return plugin
}

export { css } from './index'
export type { PluginConfig } from './index'
