import UniversalProvider from '@walletconnect/universal-provider'
interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  address: string | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({ provider, address, session, setSession }: ActionButtonListProps) => {
 
    // function to sing a msg 
    const handleSignMsg = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      console.log("address", address);
      try {
        const method = "polkadot_signMessage"
        const result = await provider!.request<{ signature: string }>({
          method,
          params: { address, message },
        }, "polkadot:91b171bb158e2d3848fa23a9f1c25182");
        
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
        setSession(null);
        console.log("disconnected");
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
            polkadot: {
              methods: ['polkadot_signMessage', 'polkadot_signTransaction'],
              chains: ["polkadot:91b171bb158e2d3848fa23a9f1c25182"],
              events: []
            }
          }
        })
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    };


  return (
    (
    <div >
      {session ? (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
          <button onClick={handleSignMsg}>Sign msg</button>
          <div>
            <p>Session: {session?.namespaces?.polkadot?.accounts?.[0]}</p>
          </div>
          <br/>
        </>
      ) : (
        <button onClick={handleConnect}>Open</button>
      )}
    </div>
    )
  )
}
