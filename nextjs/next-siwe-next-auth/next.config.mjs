/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals.push("pino-pretty", "lokijs", "encoding", /^@x402\//);
      return config;
    }
  };
  
  export default nextConfig;
  