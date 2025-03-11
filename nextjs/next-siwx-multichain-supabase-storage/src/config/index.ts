import {
  bitcoin,
  bitcoinTestnet,
  mainnet,
  sepolia,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Get projectId from https://cloud.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const bitcoinNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  bitcoin,
  bitcoinTestnet,
];

export const evmNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  sepolia,
];

export const networks = [
  ...bitcoinNetworks,
  ...evmNetworks,
];

// Set up Bitcoin Adapter
export const bitcoinAdapter = new BitcoinAdapter({
  projectId,
});

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: evmNetworks,
  ssr: true,
});
