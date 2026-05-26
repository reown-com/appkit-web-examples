"use client";

import {
  bitcoinAdapter,
  networks,
  projectId,
  tronAdapter,
  wagmiAdapter,
} from "@/config";
import { ServerSIWX } from "@/siwx/ServerSIWX";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const metadata = {
  name: "next-siwx-multichain-own-server",
  description: "SIWX multichain with your own Next.js server",
  url: "https://reown.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter, bitcoinAdapter, tronAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "light",
  features: {
    analytics: true,
    socials: [],
    email: false,
  },
  siwx: new ServerSIWX(),
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
