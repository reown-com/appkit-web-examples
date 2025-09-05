import { useEffect } from 'react';
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { parseGwei, type Address } from 'viem'
import { baseUSDC, pay } from '@reown/appkit-pay';
import { networks } from '../config'
import { useAccount } from 'wagmi'

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

export const ActionButtonList = () => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
    const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected


    const { chain } = useAccount();


    useEffect(() => {
      if (isConnected) {
        console.log("isConnected", isConnected);
        console.log("chain", chain);
        
        //switchNetwork(networks[1]);
      }
  }, [isConnected]);

  const handleSuccess = (data: any) => {
    console.log("Payment successful:", data);
  };

  const handleError = (error: any) => {
    console.error("Payment error:", error);
  };


    // function to send a tx
    const handleDeposit = async () => {
      const result = await pay({ 
        paymentAsset: baseUSDC,
        recipient: address || '',
        amount: 0.001
      });

      const { success, result: data, error } = result;
      if (success) {
        handleSuccess(data);
      } else {
        handleError(error);
      }
    }

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

  return (
    <div>
    {isConnected && ( 
    <>
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
        <button onClick={handleDeposit}>Deposit w/exchange</button>
    </>
    )}
  </div>
  )
}
