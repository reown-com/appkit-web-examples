import { solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'

const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const appKit = createAppKit({
  adapters: [new SolanaAdapter()],
  networks: [solana, solanaDevnet, solanaTestnet],
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  },
  features: {
    analytics: true,
  }
})
