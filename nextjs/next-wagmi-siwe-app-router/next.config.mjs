/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: {
        rules: {
          // Add external packages that should be transpiled
          external: ["pino-pretty", "lokijs", "encoding"]
        }
      }
    }
  };
  
  export default nextConfig;
  