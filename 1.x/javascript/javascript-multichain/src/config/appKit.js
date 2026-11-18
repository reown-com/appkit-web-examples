import { arbitrum, mainnet, optimism, polygon, sepolia, solana } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'

const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks = [arbitrum, mainnet, optimism, polygon, sepolia, solana]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
})

//Set up the Solana Adapter (Config)
export const solanaAdapter = new SolanaAdapter()

export const appKit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  networks,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  },
  features: {
    analytics: true,
  }
})
