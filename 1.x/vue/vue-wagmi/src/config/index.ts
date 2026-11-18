import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/vue'
import { mainnet, polygon, base, type AppKitNetwork } from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, polygon, base]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

// createAppKit must be called before WagmiPlugin is registered
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    connectMethodsOrder: ['email', 'social', 'wallet'],
    analytics: true,
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