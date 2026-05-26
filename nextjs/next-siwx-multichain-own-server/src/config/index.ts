import {
  bitcoin,
  bitcoinTestnet,
  mainnet,
  sepolia,
  tronMainnet,
  tronShastaTestnet,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { TronAdapter } from "@reown/appkit-adapter-tron";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const evmNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  sepolia,
];

export const bitcoinNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  bitcoin,
  bitcoinTestnet,
];

export const tronNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  tronMainnet,
  tronShastaTestnet,
];

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  ...evmNetworks,
  ...bitcoinNetworks,
  ...tronNetworks,
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: evmNetworks,
  ssr: true,
});

export const bitcoinAdapter = new BitcoinAdapter({
  projectId,
});

export const tronAdapter = new TronAdapter({
  walletAdapters: [
    new TronLinkAdapter({
      openUrlWhenWalletNotFound: false,
      checkTimeout: 3000,
    }),
  ],
});
