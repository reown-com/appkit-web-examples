import { useDisconnect, useAppKit, useAppKitNetwork  } from '@reown/appkit/react'
import { networks } from '../config'
import { useWriteContract } from 'wagmi'





export const ActionButtonList = () => {
  const { writeContractAsync } = useWriteContract();
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };



    const onApprove = async () => {
      const tokenAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
      const spenderAddress = "0xcB6A062a349F60832F21Db6A5bE71603107884C7"; 
      
       await writeContractAsync(
        {
          address: tokenAddress,
          abi: [{
            type: 'function',
            name: 'approve',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ type: 'bool' }],
          }],
          functionName: 'approve',
          args: [spenderAddress, 123n], // Approving 123 tokens
      });

  };
  return (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
        <button onClick={onApprove}>Approve</button>
    </div>
  )
}
