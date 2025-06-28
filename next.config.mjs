const nextConfig = {
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
  // Ensure stable configuration for Next.js 14
  swcMinify: true,
  reactStrictMode: true,
};

export default nextConfig;