import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/anbudly',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
