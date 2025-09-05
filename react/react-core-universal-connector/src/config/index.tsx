import type { AppKitNetwork } from '@reown/appkit/networks'
import type { CustomCaipNetwork } from '@reown/appkit-common'
import { UniversalConnector } from '@reown/appkit-universal-connector'

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}
const suiMainnet: CustomCaipNetwork<'sui'> = {
  id: 784,
  chainNamespace: 'sui' as const,
  caipNetworkId: 'sui:mainnet',
  name: 'Sui',
  nativeCurrency: { name: 'SUI', symbol: 'SUI', decimals: 9 },
  rpcUrls: { default: { http: ['https://fullnode.mainnet.sui.io:443'] } }
}

const stacksMainnet: CustomCaipNetwork<'stacks'> = {
  id: 1,
  chainNamespace: 'stacks' as const,
  caipNetworkId: 'stacks:1',
  name: 'Stacks',
  nativeCurrency: { name: 'STX', symbol: 'STX', decimals: 6 },
  rpcUrls: { default: { http: ['https://stacks-node-mainnet.stacks.co'] } }
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [suiMainnet, stacksMainnet] as [AppKitNetwork, ...AppKitNetwork[]]

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
        methods: ['sui_signPersonalMessage'],
        chains: [suiMainnet as CustomCaipNetwork],
        events: [],
        namespace: 'sui'
      },
      {
        methods: ['stx_signMessage'],
        chains: [stacksMainnet as CustomCaipNetwork],
        events: ['stx_chainChanged'],
        namespace: 'stacks'
      }
    ]
  })

  return universalConnector
}
