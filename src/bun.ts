import { createBunPlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createBunPlugin(unpluginFactory)
export { css } from './index'
