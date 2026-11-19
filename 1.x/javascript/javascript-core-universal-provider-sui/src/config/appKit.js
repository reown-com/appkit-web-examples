import UniversalProvider from '@walletconnect/universal-provider'
import { createAppKit } from '@reown/appkit/core'

export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('Project ID is not defined')
}

// you can configure your own network
const sui = {
  id: 784,
  chainNamespace: 'sui',
  caipNetworkId: 'sui:mainnet',
  name: 'Sui',
  nativeCurrency: { name: 'SUI', symbol: 'SUI', decimals: 9 },
  rpcUrls: { default: { http: ['https://fullnode.mainnet.sui.io:443'] } }
}

export const networks = [sui]

export let provider
export let appKit

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init({
      projectId,
      metadata: {
        name: "WalletConnect x Sui",
        description: "Sui integration with WalletConnect's Universal Provider",
        url: "https://walletconnect.com/", // origin must match your domain & subdomain
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      }
    })
  }
  return provider
}

export function initializeAppKit(universalProvider) {
  if (!appKit && universalProvider) {
    appKit = createAppKit({
      projectId,
      networks,
      universalProvider,
      manualWCControl: true,
      features: {
        analytics: true
      }
    })
  }
  return appKit
} 