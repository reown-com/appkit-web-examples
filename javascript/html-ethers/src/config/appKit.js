import { arbitrum, mainnet, optimism, polygon, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [arbitrum, mainnet, optimism, polygon, sepolia],
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})
