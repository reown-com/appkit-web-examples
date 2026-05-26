"use client";

import { useAppKitAccount, useAppKitNetwork, useAppKitState } from "@reown/appkit/react";
import { useClientMounted } from "@/hooks/useClientMount";

export const InfoList = () => {
  const mounted = useClientMounted();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();
  const state = useAppKitState();

  if (!mounted) return null;

  return (
    <>
      <section>
        <h2>Wallet</h2>
        <pre>
          Connected: {isConnected.toString()}
          {"\n"}
          Address: {address}
          {"\n"}
          CAIP Address: {caipAddress}
          {"\n"}
          Active Chain: {state.activeChain}
          {"\n"}
          Network: {caipNetwork?.name}
        </pre>
      </section>
    </>
  );
};
