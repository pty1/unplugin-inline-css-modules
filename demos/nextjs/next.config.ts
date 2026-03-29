import type { NextConfig } from 'next'
import inlineCSSModules from 'unplugin-inline-css-modules/next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    const plugin = inlineCSSModules()
    config.plugins = config.plugins || []
    config.plugins.push(plugin)
    return config
  },
}

export default nextConfig
