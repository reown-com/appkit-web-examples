import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { networks } from '../config'
import { useSignMessage } from 'wagmi'
import { type Address } from 'viem'

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();

    // get the address
    const { address } = useAppKitAccount()

    const { signMessageAsync } = useSignMessage()
    

    const singMsg = async () => {
        const msg = "Hello Reown AppKit!"
        const sig = await signMessageAsync({ message: msg, account: address as Address });

        console.log(sig);
    }
  return (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
        <button onClick={() => singMsg() }>Sign Msg</button>
    </div>
  )
}
