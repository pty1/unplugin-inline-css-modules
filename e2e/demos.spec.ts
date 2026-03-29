import { expect, test } from '@playwright/test'

const demos = [
  'vite-react',
  'vite-vue',
  'vite-solid',
  'sveltekit',
  'solid-start',
  'nextjs',
  'nuxt_4',
] as const
const basePort = 5173

for (const name of demos) {
  test(
    `${name}: inline css modules work`,
    { tag: `@${name}` },
    async ({ page }) => {
      const port = basePort + demos.indexOf(name)
      await page.goto(`http://localhost:${port}`)
      await page.waitForLoadState('networkidle')

      const button = page.locator('#detect')
      await button.waitFor({ state: 'visible' })

      const backgroundColor = await button.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor
      })

      expect(backgroundColor).toBe('rgb(31, 30, 51)')
    }
  )
}
