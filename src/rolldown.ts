import { createRolldownPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createRolldownPlugin(unpluginFactory)
export { css } from './index'
export type { PluginConfig } from './index'
