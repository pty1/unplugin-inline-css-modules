import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import inlineCSSModules from '../../dist/vite.mjs'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), inlineCSSModules()],
    server: {
      port: env.PORT ? parseInt(env.PORT) : 5173,
    },
  }
})
