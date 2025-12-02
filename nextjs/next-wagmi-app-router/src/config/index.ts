import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { http } from 'viem';

const DATAHAVEN_TESTNET_ID = 55931
const DATAHAVEN_RPC_URL = 'https://services.datahaven-testnet.network/testnet'

export const dataHavenTestnet: AppKitNetwork = defineChain({
  id: DATAHAVEN_TESTNET_ID,
  name: "DataHaven Testnet",
  chainNamespace: 'eip155',
  caipNetworkId: `eip155:55931`,
  testnet: true,
  nativeCurrency: {
    name: "MOCK",
    symbol: "MOCK",
    decimals: 18,
  },
  rpcUrls: {
    [DATAHAVEN_TESTNET_ID]: { http: [DATAHAVEN_RPC_URL] },
    default: { http: [DATAHAVEN_RPC_URL] },
    public: { http: [DATAHAVEN_RPC_URL] },
  },
  blockExplorers: {
    default: {
      name: "DataHaven Testnet",
      url: "https://polkadot.js.org/apps?rpc=wss://services.datahaven-testnet.network/testnet#/explorer/query/",
    },
  },
});
// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [dataHavenTestnet] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  transports: {
    [dataHavenTestnet.id]: http('https://services.datahaven-testnet.network/testnet'),
  },
})

export const config = wagmiAdapter.wagmiConfig