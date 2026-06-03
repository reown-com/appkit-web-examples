import { createAppKit } from '@reown/appkit'
import { tronMainnet, tronShastaTestnet } from '@reown/appkit/networks'
import { TronAdapter } from '@reown/appkit-adapter-tron'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'

// Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694' // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks = [tronMainnet]

// Set up the Tron Adapter
const tronAdapter = new TronAdapter({
  walletAdapters: [
    new TronLinkAdapter({
      openUrlWhenWalletNotFound: false,
      checkTimeout: 3000
    })
  ]
})

// Set up metadata
const metadata = {
  name: 'svelte-reown-appkit',
  description: 'AppKit Tron Svelte Example',
  url: 'https://github.com/reown-com/appkit-web-examples',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const appKit = createAppKit({
  adapters: [tronAdapter],
  networks,
  projectId,
  metadata,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000'
  }
})
