import type { AppKitNetwork } from '@reown/appkit/networks'
import type { CustomCaipNetwork } from '@reown/appkit-common'
import { UniversalConnector } from '@reown/appkit-universal-connector'

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}


const solana: CustomCaipNetwork<'solana'> = {
  id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  chainNamespace: 'Solana' as const,
  caipNetworkId: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  name: 'Solana',
  nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
  rpcUrls: { default: { http: ['https://rpc.walletconnect.org/v1'] } }
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [solana] as [AppKitNetwork, ...AppKitNetwork[]]

export async function getUniversalConnector() {
  const universalConnector = await UniversalConnector.init({
    projectId,
    metadata: {
      name: 'Universal Connector',
      description: 'Universal Connector',
      url: 'https://appkit.reown.com',
      icons: ['https://appkit.reown.com/icon.png']
    },
    networks: [
      {
        methods: ['solana_signMessage'],
        chains: [solana as CustomCaipNetwork],
        events: ['solana_chainChanged'],
        namespace: 'solana'
      }
    ]
  })

  return universalConnector
}
