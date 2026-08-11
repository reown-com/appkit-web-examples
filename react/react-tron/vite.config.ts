import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  // tronweb relies on node built-ins (Buffer, process), so they need to be polyfilled
  plugins: [react(), nodePolyfills()],
  define: {
    'process.env': {},
  },
})
