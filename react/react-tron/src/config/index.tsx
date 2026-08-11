import { tronMainnet, tronShastaTestnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { TronAdapter } from '@reown/appkit-adapter-tron'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask-tron'


// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create a metadata object - optional
export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://reown.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [tronMainnet, tronShastaTestnet]

// USDT (TRC-20) has 6 decimals on every TRON network, but a different address on each one.
// Shasta USDT can be claimed from the TronFAQBot faucet in the TRON Discord: `!shasta_usdt <address>`
export const USDT_ADDRESS: Record<string, string> = {
  [tronMainnet.id]: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  [tronShastaTestnet.id]: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'
}

// 0.01 USDT expressed in the token's smallest unit (10 ** 6)
export const USDT_AMOUNT = 10_000

// TRON rejects native TRX transfers where the sender and the recipient are the same account, so the
// "Send tx" action needs a real counterparty. This is the TRON black hole address.
// NOTE: replace it with an address you control if you want the TRX back.
export const RECIPIENT_ADDRESS = 'TBPPmZpqXoLUaxNbbDMvCK888doHneEsrD'

// Set up Tron Adapter
export const tronAdapter = new TronAdapter({
  walletAdapters: [
    new TronLinkAdapter({
      openUrlWhenWalletNotFound: false,
      checkTimeout: 3000
    }),
    new MetaMaskAdapter({
      openUrlWhenWalletNotFound: false,
      checkTimeout: 3000
    })
  ]
})
