import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/eyrya-website',
  assetPrefix: '/eyrya-website/',
};

export default nextConfig;
