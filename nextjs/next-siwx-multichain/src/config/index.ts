import {
  bitcoin,
  bitcoinTestnet,
  mainnet,
  sepolia,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { solana, solanaTestnet } from "@reown/appkit/networks";

// Get projectId from https://dashboard.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const bitcoinNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  bitcoin,
  bitcoinTestnet,
];

export const solanaNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  solana,
];

export const evmNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
];

// Set up Bitcoin Adapter
export const solanaAdapter = new SolanaAdapter();

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: evmNetworks,
});
