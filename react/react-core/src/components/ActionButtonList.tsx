
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { networks } from '../config'


export const ActionButtonList = () => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
    const { isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };


  return (
    isConnected && (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>

    </div>
    )
  )
}
