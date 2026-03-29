import { createEsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './plugin'

export default createEsbuildPlugin(unpluginFactory)

export { css } from './index'
