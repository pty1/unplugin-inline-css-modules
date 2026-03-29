import { defineConfig, loadEnv } from 'vite'
import inlineCSSModules from '../../dist/vite.mjs'
import solidPlugin from 'vite-plugin-solid'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      solidPlugin(),
      inlineCSSModules({
        tagName: 'css',
      }),
    ],
    server: {
      port: env.PORT ? parseInt(env.PORT) : 5173,
    },
    build: {
      target: 'esnext',
    },
  }
})
