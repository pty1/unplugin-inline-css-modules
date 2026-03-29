import { createRollupPlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createRollupPlugin(unpluginFactory)

export { css } from './index'
