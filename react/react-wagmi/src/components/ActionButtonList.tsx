import { useEffect } from 'react';
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { parseGwei, type Address } from 'viem'
import { useEstimateGas, useSendTransaction, useSignMessage, useBalance } from 'wagmi'
import { networks } from '../config'

// test transaction
const TEST_TX = {
  to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" as Address, // vitalik address
  value: parseGwei('0.0001')
}

interface ActionButtonListProps {
  sendHash: (hash: `0x${string}` ) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
    const { address } = useAppKitAccount() // AppKit hook to get the address

    const { data: gas } = useEstimateGas({...TEST_TX}); // Wagmi hook to estimate gas
    const { data: hash, sendTransaction, } = useSendTransaction(); // Wagmi hook to send a transaction
    const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message
    const { refetch } = useBalance({
      address: address as Address
    }); // Wagmi hook to get the balance

    useEffect(() => {
        if (hash) {
          sendHash(hash);
        }
    }, [hash]);

    // function to send a tx
    const sendTx = () => {
      try {
        sendTransaction({
          ...TEST_TX,
          gas // Add the gas to the transaction
        });
      } catch (err) {
        console.log('Error sending transaction:', err);
      }
    }

    // function to sing a msg 
    const signMsg = async () => {
      const msg = "Hello Reown AppKit!" // message to sign
      const sig = await signMessageAsync({ message: msg, account: address as Address }); 
      sendSignMsg(sig);
    }

    // function to get the balance
    const getBalance = async () => {
      const balance = await refetch()
      sendBalance(balance?.data?.value.toString() + " " + balance?.data?.symbol.toString())
    }


  return (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
        <button onClick={() => signMsg() }>Sign msg</button>
        <button onClick={() => sendTx() }>Send tx</button>
        <button onClick={() => getBalance()}>Get Balance</button>  
    </div>
  )
}
