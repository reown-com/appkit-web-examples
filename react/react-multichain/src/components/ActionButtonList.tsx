import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { networks } from '../config'
import type { Provider as SolanaProvider } from '@reown/appkit-adapter-solana/react'
import { useSignMessage } from 'wagmi'
import {  type Address } from 'viem'

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();
    const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message
    const { address: addressEVM, isConnected } = useAppKitAccount({ namespace: "eip155" }); // AppKit hook to get the address and check if the user is connected
    const { address: addressSolana, isConnected: isConnectedSolana } = useAppKitAccount({ namespace: "solana" }); // AppKit hook to get the address and check if the user is connected
    const { walletProvider: solanaWalletProvider } = useAppKitProvider<SolanaProvider>('solana')

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    // function to sing a msg 
    const handleEVMSignMsg = async () => {
      const msg = "Hello Reown AppKit!" // message to sign
      const sig = await signMessageAsync({ message: msg, account: addressEVM as Address }); 

      console.log("EVM signature:", sig);
    }

    // function to sing a msg 
    const handleSolanaSignMsg = async () => {
      if (!solanaWalletProvider || !addressSolana) throw Error('user is disconnected')
      
      const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
      const sig = await solanaWalletProvider.signMessage(encodedMessage);

      const signatureHex = Buffer.from(sig).toString("hex");
      console.log("Solana signature:", signatureHex);
    }
  return (
    <div >
          <button onClick={() => open({ view: 'Connect', namespace: 'eip155' })}>Open EVM</button>
          <button onClick={() => open({ view: 'Connect', namespace: 'solana' })}>Open Solana</button>
          { (isConnected || isConnectedSolana )&& (
            <>
              <button onClick={handleDisconnect}>Disconnect</button>
              <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
              <button onClick={handleEVMSignMsg}>Sign EVM msg</button>
              <button onClick={handleSolanaSignMsg}>Sign Solana msg</button>
            </>
        )}
    </div>
  )
}
