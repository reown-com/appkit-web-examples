import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: config => {
    config.externals.push(
      'pino-pretty',
      'lokijs',
      'encoding',
      'porto',
      '@x402/evm',
      '@x402/evm/upto/client',
      '@x402/evm/exact/client',
      '@x402/core/client',
      '@x402/svm/exact/client'
    )
    return config
  }
};

export default nextConfig;
