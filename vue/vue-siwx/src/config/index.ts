import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { TronAdapter } from '@reown/appkit-adapter-tron'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { createAppKit } from '@reown/appkit/vue'
import {
  mainnet,
  optimism,
  arbitrum,
  base,
  polygon,
  bsc,
  avalanche,
  tronMainnet,
  tronShastaTestnet,
  type AppKitNetwork
} from '@reown/appkit/networks'
import { ReownAuthentication } from '@reown/appkit-siwx'

export const projectId = import.meta.env.VITE_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694'
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  optimism,
  arbitrum,
  base,
  polygon,
  bsc,
  avalanche,
  tronMainnet,
  tronShastaTestnet
]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

export const tronAdapter = new TronAdapter({
  walletAdapters: [
    new TronLinkAdapter({
      openUrlWhenWalletNotFound: true,
      checkTimeout: 3000
    })
  ]
})

// SIWX always required — reproduces the broken state when the user
// abandons the sign-message step (close modal, reject in wallet, etc.)
// ReownAuthentication uses Reown Cloud for signature verification across
// all namespaces (EVM, Tron, ...) — no per-namespace verifier needed.
const siwx = new ReownAuthentication()
;(siwx as unknown as { getRequired: () => boolean }).getRequired = () => true

// createAppKit must be called before WagmiPlugin is registered
createAppKit({
  adapters: [wagmiAdapter, tronAdapter],
  networks,
  projectId,
  themeMode: 'light',
  siwx,
  features: {
    analytics: true
  },
  metadata: {
    name: 'AppKit Vue SIWX Repro',
    description: 'Repro: multi-namespace SIWX abandonment leaves AppKit in broken state',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000'
  }
})
