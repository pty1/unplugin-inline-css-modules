import { createBunPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createBunPlugin(unpluginFactory)
export { css } from './index'
export type { PluginConfig } from './index'
