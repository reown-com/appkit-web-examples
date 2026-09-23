import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: config => {
    config.externals.push( /^@x402\//)
    return config
  }
};

export default nextConfig;
