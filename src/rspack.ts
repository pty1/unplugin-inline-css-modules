import { createRspackPlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createRspackPlugin(unpluginFactory)
export { css } from './index'
