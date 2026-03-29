import { createWebpackPlugin } from 'unplugin'
import { PluginConfig, unpluginFactory } from './index'

export default function (options: PluginConfig = {}) {
  return createWebpackPlugin(unpluginFactory)({
    ...options,
    moduleStrategy: options.moduleStrategy || 'filesystem',
  })
}

export { css } from './index'
export type { PluginConfig } from './index'
