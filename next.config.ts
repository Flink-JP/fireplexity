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
  // Fix for workStore invariant error in Next.js 15
  experimental: {
    // Disable problematic experimental features
    ppr: false,
    reactCompiler: false,
  },
  // Ensure proper client/server boundary
  transpilePackages: [],
};

export default nextConfig;