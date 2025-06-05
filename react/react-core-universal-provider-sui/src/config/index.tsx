import type { AppKitNetwork } from '@reown/appkit/networks'
import type { InferredCaipNetwork } from '@reown/appkit-common'
import UniversalProvider from '@walletconnect/universal-provider'
import { AppKit, createAppKit } from '@reown/appkit/core'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const sui: InferredCaipNetwork = {
  id: 784,
  chainNamespace: 'sui' as const,
  caipNetworkId: 'sui:mainnet',
  name: 'Sui',
  nativeCurrency: { name: 'SUI', symbol: 'SUI', decimals: 9 },
  rpcUrls: { default: { http: ['https://fullnode.mainnet.sui.io:443'] } }
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [sui] as [AppKitNetwork, ...AppKitNetwork[]]

let provider: UniversalProvider | undefined
let modal: AppKit | undefined

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init(
      { 
        projectId, 
        metadata: {
          name: "WalletConnect x Sui",
          description: "Sui integration with WalletConnect's Universal Provider",
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
      networks,
      universalProvider: universalProvider as any, // Type cast to fix version mismatch
      manualWCControl: true,
      features: {
        analytics: true // Optional - defaults to your Cloud configuration
      }
    })
  }
  return modal
}
