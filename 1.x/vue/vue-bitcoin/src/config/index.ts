
import { bitcoin, bitcoinTestnet, type AppKitNetwork } from '@reown/appkit/networks'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'


export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bitcoin, bitcoinTestnet]

// Set up Bitcoin Adapter
export const bitcoinAdapter = new BitcoinAdapter({
  projectId
})