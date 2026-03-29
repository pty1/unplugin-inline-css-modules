import { createVitePlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createVitePlugin(unpluginFactory)
export { css } from './index'
export type { PluginConfig } from './index'
