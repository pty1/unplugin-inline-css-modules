import { resolve } from 'path'
import { env } from 'process'
import type { Options } from 'tsup'

const isProd = env.NODE_ENV === 'production'

export const tsup: Options = {
  clean: true,
  dts: true,
  entry: {
    index: resolve(__dirname, 'src/index.ts'),
    plugin: resolve(__dirname, 'src/plugin.ts'),
    vite: resolve(__dirname, 'src/vite.ts'),
    rollup: resolve(__dirname, 'src/rollup.ts'),
    rolldown: resolve(__dirname, 'src/rolldown.ts'),
    webpack: resolve(__dirname, 'src/webpack.ts'),
    rspack: resolve(__dirname, 'src/rspack.ts'),
    esbuild: resolve(__dirname, 'src/esbuild.ts'),
    farm: resolve(__dirname, 'src/farm.ts'),
    bun: resolve(__dirname, 'src/bun.ts'),
    nuxt: resolve(__dirname, 'src/nuxt.ts'),
    astro: resolve(__dirname, 'src/astro.ts'),
    next: resolve(__dirname, 'src/next.ts'),
  },
  minify: isProd,
  sourcemap: true,
  splitting: false,
  format: ['cjs', 'esm'],
  external: ['unplugin', 'next'],
}
