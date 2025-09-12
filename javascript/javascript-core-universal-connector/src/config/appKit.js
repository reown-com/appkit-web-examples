import { UniversalConnector } from '@reown/appkit-universal-connector'

export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('Project ID is not defined')
}

// you can configure your own network
const suiMainnet = {
  id: 784,
  chainNamespace: 'sui',
  caipNetworkId: 'sui:mainnet',
  name: 'Sui',
  nativeCurrency: { name: 'SUI', symbol: 'SUI', decimals: 9 },
  rpcUrls: { default: { http: ['https://fullnode.mainnet.sui.io:443'] } }
}

const stacksMainnet = {
  id: 1,
  chainNamespace: 'stacks',
  caipNetworkId: 'stacks:1',
  name: 'Stacks',
  nativeCurrency: { name: 'STX', symbol: 'STX', decimals: 6 },
  rpcUrls: { default: { http: ['https://stacks-node-mainnet.stacks.co'] } }
}

export const networks = [suiMainnet, stacksMainnet]

export let connector

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
        chains: [suiMainnet],
        events: [],
        namespace: 'sui'
      },
      {
        methods: ['stx_signMessage'],
        chains: [stacksMainnet],
        events: ['stx_chainChanged'],
        namespace: 'stacks'
      }
    ]
  })

  return universalConnector
}

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