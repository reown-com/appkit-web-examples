import type { AppKitNetwork } from "@reown/appkit/networks";
import { defineChain } from "@reown/appkit/networks";
import UniversalProvider from "@walletconnect/universal-provider";
import { AppKit, createAppKit } from "@reown/appkit/core";

// Get projectId from https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_PROJECT_ID || "9da6a8648d0e56574c085e52233e50da";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// SUI Chain definitions - using compatible namespace for AppKit
const suiMainnet = defineChain({
  id: "sui-mainnet",
  name: "SUI Mainnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.mainnet.sui.io:443"] },
  },
  blockExplorers: {
    default: { name: "SUI Explorer", url: "https://explorer.sui.io/" },
  },
  chainNamespace: "polkadot",
  caipNetworkId: "polkadot:sui-mainnet",
});

const suiTestnet = defineChain({
  id: "sui-testnet",
  name: "SUI Testnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.testnet.sui.io:443"] },
  },
  blockExplorers: {
    default: {
      name: "SUI Explorer",
      url: "https://explorer.sui.io/?network=testnet",
    },
  },
  chainNamespace: "polkadot",
  caipNetworkId: "polkadot:sui-testnet",
});

const suiDevnet = defineChain({
  id: "sui-devnet",
  name: "SUI Devnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.devnet.sui.io:443"] },
  },
  blockExplorers: {
    default: {
      name: "SUI Explorer",
      url: "https://explorer.sui.io/?network=devnet",
    },
  },
  chainNamespace: "polkadot",
  caipNetworkId: "polkadot:sui-devnet",
});

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [suiMainnet, suiTestnet, suiDevnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

// SUI Methods and Events
export enum DEFAULT_SUI_METHODS {
  SUI_SIGN_TRANSACTION = "sui_signTransaction",
  SUI_SIGN_AND_EXECUTE_TRANSACTION = "sui_signAndExecuteTransaction",
  SUI_SIGN_PERSONAL_MESSAGE = "sui_signPersonalMessage",
}

export enum DEFAULT_SUI_EVENTS {
  SUI_ACCOUNTS_CHANGED = "sui_accountsChanged",
  SUI_CHAIN_CHANGED = "sui_chainChanged",
}

let provider: UniversalProvider | undefined;
let modal: AppKit | undefined;

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init({
      projectId,
      metadata: {
        name: "WalletConnect x SUI",
        description: "SUI integration with WalletConnect's Universal Provider",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });
  }
  return provider;
}

export function initializeModal(universalProvider?: any) {
  if (!modal && universalProvider) {
    modal = createAppKit({
      projectId,
      networks: [suiMainnet, suiTestnet, suiDevnet],
      universalProvider,
      manualWCControl: true,
      features: {
        analytics: true, // Optional - defaults to your Cloud configuration
      },
    });
  }
  return modal;
}
