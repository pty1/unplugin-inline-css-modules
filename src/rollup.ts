import { createRollupPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createRollupPlugin(unpluginFactory)

export { css } from './index'
export type { PluginConfig } from './index'
