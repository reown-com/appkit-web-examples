/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 bundles with Turbopack by default. Turbopack resolves the optional peer
  // dependencies of the wallet SDKs (pino-pretty, lokijs, encoding, porto,
  // @react-native-async-storage/async-storage) on its own, so the webpack `externals`
  // workaround this file used to carry is no longer needed.

  // Don't generate AGENTS.md / CLAUDE.md in the example directory on `next dev`.
  agentRules: false
};

export default nextConfig;
