import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker and custom server deployments
  output: 'standalone',
};

export default nextConfig;
