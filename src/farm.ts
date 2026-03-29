import { createFarmPlugin } from 'unplugin'
import { unpluginFactory } from './index'

export default createFarmPlugin(unpluginFactory) as any
export { css } from './index'
export type { PluginConfig } from './index'
