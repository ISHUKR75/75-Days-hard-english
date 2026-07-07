/** @type {import('next').NextConfig} */
// Next.js configuration - optimized for Replit environment
const nextConfig = {
  // Allow Replit preview iframe origins in development
  allowedDevOrigins: ['127.0.0.1', 'localhost', '*.replit.dev', '*.repl.co'],

  // Allow all hostnames for Replit preview
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  // Enable image optimization from external sources
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
