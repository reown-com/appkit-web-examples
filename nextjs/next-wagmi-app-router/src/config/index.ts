import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'


export const dataHavenTestnet: AppKitNetwork = defineChain({
  id: 55931,
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
    default: { http: ['https://services.datahaven-testnet.network/testnet'] },
    public: { http: ['https://services.datahaven-testnet.network/testnet'] },
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
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig