import { createEsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createEsbuildPlugin(unpluginFactory)

export { css } from './index'
export type { PluginConfig } from './index'
