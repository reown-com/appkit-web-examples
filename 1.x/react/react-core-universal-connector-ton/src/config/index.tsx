import type { AppKitNetwork } from '@reown/appkit/networks'
import type { CustomCaipNetwork } from '@reown/appkit-common'
import { UniversalConnector } from '@reown/appkit-universal-connector'

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}
const tonMainnet: CustomCaipNetwork<'ton'> = {
  id: -239,
  chainNamespace: 'ton' as const,
  caipNetworkId: 'ton:-239',
  name: 'TON',
  nativeCurrency: { name: 'TON', symbol: 'TON', decimals: 9 },
  rpcUrls: { default: { http: ['https://toncenter.com/api/v2/jsonRPC'] } }
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [tonMainnet] as [AppKitNetwork, ...AppKitNetwork[]]

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
        methods: ['ton_signData'],
        chains: [tonMainnet as CustomCaipNetwork],
        events: [],
        namespace: 'ton'
      }
    ]
  })

  return universalConnector
}
