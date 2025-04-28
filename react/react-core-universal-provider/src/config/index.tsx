import type { AppKitNetwork } from '@reown/appkit/networks'
import { solana,mainnet } from '@reown/appkit/networks'
import UniversalProvider from '@walletconnect/universal-provider'
import { AppKit, createAppKit } from '@reown/appkit/core'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [solana] as [AppKitNetwork, ...AppKitNetwork[]]

let provider: UniversalProvider | undefined
let modal: AppKit | undefined

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init({ projectId })
    console.log("provider", provider);
  }
  return provider
}

export function initializeModal(universalProvider?: UniversalProvider) {
  if (!modal && universalProvider) {
    modal = createAppKit({
      projectId,
      networks: [mainnet],
      universalProvider,
      manualWCControl: true,
      features: {
        analytics: true // Optional - defaults to your Cloud configuration
      }
    })
  }
  return modal
}
