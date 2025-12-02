import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Get projectId from https://dashboard.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

export const dataHavenTestnet = defineChain({
  id: 55931,
  name: "Datahaven Testnet",
  chainNamespace: "eip155",
  caipNetworkId: "eip155:55931",
  nativeCurrency: {
    decimals: 18,
    name: "MOCK",
    symbol: "MOCK",
  },
  rpcUrls: {
    default: {
      http: [
        `https://rpc.walletconnect.org/v1/?chainId=eip155:55931&projectId=${projectId}`,
      ],
    },
  },
  testnet: true,
});

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [dataHavenTestnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
