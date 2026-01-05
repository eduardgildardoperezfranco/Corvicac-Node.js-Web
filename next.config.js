/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger-compatible configuration
  output: 'standalone',
  
  // Enable strict TypeScript checking for production
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Disable ESLint during builds to avoid version conflicts
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization configuration for static deployment
  images: {
    unoptimized: true, // Use unoptimized images for static deployment compatibility
    domains: ['corvicac.org', 'localhost'], // Allowed domains for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'corvicac.org',
        port: '',
        pathname: '/images/**',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year cache for static assets
    formats: ['image/avif', 'image/webp'], // Modern formats for better performance
    dangerouslyAllowSVG: true, // Allow SVG files
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-src 'self' https://youtube.com https://www.youtube.com;",
  },
  
  // Disable experimental features that might cause issues
  experimental: {
    // No experimental features enabled for stability
  },
  
  // Ensure consistent behavior across environments
  reactStrictMode: true,
  
};

export default nextConfig;