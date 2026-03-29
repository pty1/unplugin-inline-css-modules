import { createRolldownPlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createRolldownPlugin(unpluginFactory)
export { css } from './index'
