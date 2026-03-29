import { createWebpackPlugin } from 'unplugin'
import type { PluginConfig } from './index'

export default function (options: PluginConfig = {}) {
  return createWebpackPlugin(unpluginFactory)(options)
}

export { css } from './index'
export type { PluginConfig } from './index'

import { unpluginFactory } from './index'
