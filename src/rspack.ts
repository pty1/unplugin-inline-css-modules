import { createRspackPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createRspackPlugin(unpluginFactory)
export { css } from './index'
export type { PluginConfig } from './index'
