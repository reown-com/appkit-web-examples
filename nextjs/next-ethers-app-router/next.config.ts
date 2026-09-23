import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'porto', /^@x402\//)
    return config
  }
};

export default nextConfig;
