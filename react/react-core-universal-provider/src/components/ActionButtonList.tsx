import UniversalProvider from '@walletconnect/universal-provider'
interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  address: string | undefined;
}

export const ActionButtonList = ({ provider, address }: ActionButtonListProps) => {
 
    // function to sing a msg 
    const handleSignMsg = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      console.log("address", address);
      try {
        const method = "personal_sign"
        const result = await provider!.request<{ signature: string }>({
          method,
          params: { address, message },
        }, "eip155:1");
        
        console.log("result", result.signature);
      } catch (error: any) {
        console.log("error", error);
        throw new Error(error);
      }
    }

    const handleDisconnect = async () => {
      try {
        if (!provider) return;
        await provider.disconnect()
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };


    const handleConnect = async () => {
      try {
        if (!provider) {
          throw new Error("Provider is not initialized");
        }
        await provider.connect({
          optionalNamespaces: {
            solana: {
              methods: ['solana_signTransaction', 'solana_signMessage'],
              chains: ['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'],
              events: ['chainChanged', 'accountsChanged'],
            },
            eip155: {
              methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData_v4', 'wallet_addEthereumChain'],
              chains: ['eip155:1'],
              events: ['chainChanged', 'accountsChanged'],
            },
          }
        })
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    };


  return (
    (
    <div >
        <button onClick={handleConnect}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={handleSignMsg}>Sign msg</button>
    </div>
    )
  )
}
