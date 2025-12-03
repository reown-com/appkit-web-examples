"use client";

import {
  solanaAdapter,
  solanaNetworks,
  evmNetworks,
  projectId,
  wagmiAdapter,
} from "@/config";
import { createAppKit } from "@reown/appkit/react";
import React, { useState, type ReactNode } from "react";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { ReownAuthentication } from "@reown/appkit-siwx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "next-reown-appkit",
  description: "next-reown-appkit",
  url: "https://github.com/0xonerb/next-reown-appkit-ssr", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Combine evm and bitcoin networks
const allNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  ...evmNetworks,
  ...solanaNetworks,
];

// Create the modal
export const modal = createAppKit({
  adapters: [solanaAdapter, wagmiAdapter],
  projectId,
  networks: allNetworks,
  metadata,
  themeMode: "dark",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: [],
    email: false,
  },
  customRpcUrls: {
    "solana:mainnet": [
      {
        url: "https://mainnet.trueailabs.dev",
        config: {}
      }
    ]
  },
  siwx: new ReownAuthentication(),
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
