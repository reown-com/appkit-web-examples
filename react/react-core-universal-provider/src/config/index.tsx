import type { AppKitNetwork } from '@reown/appkit/networks'
import { defineChain } from '@reown/appkit/networks'
import UniversalProvider from '@walletconnect/universal-provider'
import { AppKit, createAppKit } from '@reown/appkit/core'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const polkadot = defineChain({
  id: '91b171bb158e2d3848fa23a9f1c25182',
  name: 'Polkadot',
  nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    default: { http: ['https://rpc.polkadot.io'], wss: 'wss://rpc.polkadot.io' }
  },
  blockExplorers: { default: { name: 'Polkadot Explorer', url: 'https://polkadot.js.org/apps/' } },
  chainNamespace: 'polkadot',
  caipNetworkId: 'polkadot:91b171bb158e2d3848fa23a9f1c25182'
})

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [polkadot] as [AppKitNetwork, ...AppKitNetwork[]]

let provider: UniversalProvider | undefined
let modal: AppKit | undefined

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init(
      { projectId, 
        metadata: {
          name: "WalletConnect x Polkadot",
          description: "Tron integration with WalletConnect's Universal Provider",
          url: "https://walletconnect.com/",
          icons: ["https://avatars.githubusercontent.com/u/37784886"],
        }
      })
  }
  return provider
}

export function initializeModal(universalProvider?: UniversalProvider) {
  if (!modal && universalProvider) {
    modal = createAppKit({
      projectId,
      networks: [polkadot],
      universalProvider,
      manualWCControl: true,
      features: {
        analytics: true // Optional - defaults to your Cloud configuration
      }
    })
  }
  return modal
}
