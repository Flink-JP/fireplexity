import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/firestarter-proxy-test/:path*',
        destination: 'https://firestarter-cyan.vercel.app/:path*',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable the problematic features that cause workStore issues
    turbo: undefined,
    serverComponentsExternalPackages: [],
  },
  // Force static generation to avoid SSR issues
  output: undefined,
};

export default nextConfig;