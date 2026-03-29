import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'
import inlineCSSModules from '../../dist/vite.mjs'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [inlineCSSModules(), sveltekit()],
    server: {
      port: env.PORT ? parseInt(env.PORT) : 5173,
      force: true,
    },
  }
})
