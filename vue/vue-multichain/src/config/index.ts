import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { createAppKit } from '@reown/appkit/vue'
import { mainnet, polygon, base, solana, solanaTestnet, solanaDevnet, type AppKitNetwork } from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, polygon, base, solana, solanaTestnet, solanaDevnet]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

export const solanaWeb3JsAdapter = new SolanaAdapter()

// createAppKit must be called before WagmiPlugin is registered
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true
  },
  metadata: {
    name: 'AppKit Vue Example',
    description: 'AppKit Vue Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})