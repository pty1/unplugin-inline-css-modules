import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import inlineCSSModules from '../../dist/vite.mjs'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [inlineCSSModules(), solid()],
    server: {
      port: env.PORT ? parseInt(env.PORT) : 5173,
    },
  }
})
