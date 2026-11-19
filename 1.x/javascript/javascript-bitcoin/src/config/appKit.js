import { bitcoin } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'

const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

const bitcoinAdapter = new BitcoinAdapter({
  projectId
})

export const appKit = createAppKit({
  adapters: [bitcoinAdapter],
  networks: [bitcoin],
  projectId,
  themeMode: 'light',
  features: {
    analytics: true,
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})
