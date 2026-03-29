import { createWebpackPlugin } from 'unplugin'
import { PluginConfig, unpluginFactory } from './plugin'

export default function (options: PluginConfig = {}) {
  return createWebpackPlugin(unpluginFactory)({
    ...options,
    moduleStrategy: options.moduleStrategy || 'filesystem',
  })
}

export { css } from './index'
