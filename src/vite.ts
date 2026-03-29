import { createVitePlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createVitePlugin(unpluginFactory)
export { css } from './index'
