import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  images: {
    domains: [
      'localhost', 
      'lunna-avatars-bucket-sulaiman.s3.amazonaws.com',
      'lunna-avatars-bucket-sulaiman.s3.eu-north-1.amazonaws.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS, PATCH' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
