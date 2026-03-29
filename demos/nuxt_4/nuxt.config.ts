import inlineCSSModules from 'unplugin-inline-css-modules/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [inlineCSSModules()],
  },
})
