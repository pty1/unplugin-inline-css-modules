import { defineConfig } from '@playwright/test'
import { readdirSync } from 'node:fs'

const demos = readdirSync('demos', { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort()

const basePort = 5173

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  webServer: demos.map((name, i) => ({
    name,
    command: process.env.E2E_PROD
      ? 'bun run build && bun run preview'
      : 'bun run dev',
    cwd: `demos/${name}`,
    url: `http://localhost:${basePort + i}`,
    reuseExistingServer: false,
    timeout: 120000,
    env: { PORT: String(basePort + i) },
  })),
})
