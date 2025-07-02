import UniversalProvider from '@walletconnect/universal-provider'
import { useDisconnect, useAppKitProvider, type Provider } from '@reown/appkit/react-core'
interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  address: string | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({ provider, address, session, setSession }: ActionButtonListProps) => {
  const { disconnect } = useDisconnect(); // AppKit hook to disconnect
  // @ts-ignore
  const { walletProvider } = useAppKitProvider<Provider>('sui')
    // function to sing a msg 
    const handleSignMsg = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      console.log("address", address);
      try {
        const method = "sui_signPersonalMessage"
        const result = await provider!.request<{ signature: string }>({
          method,
          params: { address, message },
        }, "sui:mainnet");
        
        console.log("result", result.signature);
      } catch (error: any) {
        console.log("error", JSON.stringify(error));
      }
    }

    const handleSignMsgWithHook = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      console.log("address", address);
      console.log("walletProvider", walletProvider);
      try {
        const method = "sui_signPersonalMessage"
        const result = await walletProvider.request<{ signature: string }>({
          method,
          params: { address, message },
        });
        console.log("result", result.signature);
      } catch (error: any) {
        console.log("error", JSON.stringify(error));
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

    const handleDisconnectWithHook = async () => {
      try {
        await disconnect();
        setSession(null);
        console.log("disconnected with hook");
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
            sui: {
              methods: ['sui_signPersonalMessage'],
              chains: ["sui:mainnet"],
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
          <button onClick={handleDisconnectWithHook}>Disconnect with hook</button>
          <button onClick={handleSignMsg}>Sign msg</button>
          <button onClick={handleSignMsgWithHook}>Sign msg with hook</button>
          <div>
            <p>Session: {session?.namespaces?.sui?.accounts?.[0]}</p>
          </div>
          <br/>
        </>
      ) : (
        <>
        <appkit-button />
        <button onClick={handleConnect}>Open</button>
        </>
      )}
    </div>
    )
  )
}
