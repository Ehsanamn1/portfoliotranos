import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Disable static generation for pages with client components
  output: 'standalone',
  // Force dynamic rendering for all pages
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
