import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'valtio/react': 'valtio/vanilla' // beware: only safe if nobody expects React-specific APIs
    },
  }
})
