import { createWebpackPlugin } from 'unplugin'
import { unpluginFactory, PluginConfig } from './plugin'

export default function (options: PluginConfig = {}) {
  return createWebpackPlugin(unpluginFactory)(options)
}

export { css } from './index'
