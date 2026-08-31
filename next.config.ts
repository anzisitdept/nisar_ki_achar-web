import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'nisarachar.com',
      },
      {
        protocol: 'https',
        hostname: 'review-images.judgeme.com',
      },
    ],
  },
};

export default nextConfig;
