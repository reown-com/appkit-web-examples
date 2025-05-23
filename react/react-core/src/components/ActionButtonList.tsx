import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider, type Provider } from '@reown/appkit/react-core'
import { networks } from '../config'


export const ActionButtonList = () => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
    const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
    const { walletProvider } = useAppKitProvider<Provider>('eip155')


    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    // function to sing a msg 
    const handleSignMsg = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      try {
        const result = await walletProvider.request({
          method: 'personal_sign',
          params: [message, address]
        }) as { signature: string }
        
        console.log("result", result);
      } catch (error: any) {
        console.log("error", error);
        throw new Error(error);
      }
    }

  return (
    isConnected && (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
        <button onClick={handleSignMsg}>Sign</button>
    </div>
    )
  )
}
