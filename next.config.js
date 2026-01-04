/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Production optimizations for hosting
  output: 'standalone',
  compress: true,
  poweredByHeader: false,

  // Image optimization for production
  images: {
    unoptimized: true, // Required for Hostinger
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },



  // Production environment variables
  // Note: NODE_ENV is handled by Next.js automatically, removed from env
};

export default nextConfig;