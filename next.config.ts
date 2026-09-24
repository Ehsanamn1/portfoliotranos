import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  serverExternalPackages: ["pg", "pg-cloudflare", "@prisma/adapter-pg"]
};

export default nextConfig;
