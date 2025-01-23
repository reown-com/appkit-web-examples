import { bitcoin } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'

const projectId = import.meta.env.VITE_PROJECT_ID
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
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})
