/** @type {import('next').NextConfig} */
// Next.js configuration - optimized for Replit environment
const nextConfig = {
  // Allow Replit preview iframe origins in development
  allowedDevOrigins: ['127.0.0.1', 'localhost', '*.replit.dev', '*.repl.co'],
  // Enable image optimization from external sources
  // Restrict to known safe domains; add more as needed
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
