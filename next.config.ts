import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.102'],
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PUBLIC_BACKEND_URL || 'http://localhost:3001'
    return [
      {
        source: '/backend/:path*',
        destination: `${backend}/:path*`,
      },
    ]
  },
};

export default nextConfig;
