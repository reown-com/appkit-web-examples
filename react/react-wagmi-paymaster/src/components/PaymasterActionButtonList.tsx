import { useAppKitNetwork, useAppKitAccount } from '@reown/appkit/react'
import { useReadContract, useSendCalls } from 'wagmi'
import { storageABI, storageAddress } from '../abi/storage'
import { parseEther, encodeFunctionData } from 'viem'
import  { projectId } from '../config'

const randomNumber = Math.floor(Math.random() * 999) + 1;

const storeCallData = encodeFunctionData({
  abi: storageABI,
  functionName: 'store',
  args: [randomNumber]
})

const STORAGE_TEST_TX = {
  to: storageAddress as `0x${string}`,
  value: parseEther('0'),
  data: storeCallData
}


export const PaymasterActionButtonList = () => {
    const { isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
    const { chainId } = useAppKitNetwork()
    const { sendCalls } = useSendCalls({
        mutation: {
          onSuccess: hash => {
            console.log("SendCalls Success", hash)
          },
          onError: (error: any ) => {
            console.log("SendCalls Error", error)
          }
        }
      });
    const readContract = useReadContract({
      address: storageAddress,
      abi: storageABI,
      functionName: 'retrieve',
      query: {
        enabled: false, // disable the query in onload
      }
    })

    const handleReadSmartContract = async () => {
      console.log("Read Sepolia Smart Contract");
      const { data } = await readContract.refetch();
      console.log("value SC: ", data)
    }

    const handleWriteSmartContract = () => {
        console.log("Write Sepolia GASLESS Smart Contract")
   
        sendCalls({
          calls: [STORAGE_TEST_TX],
          chainId: 0x2105, // hex chain id for base
          capabilities: {
            paymasterService: {
                url: "https://paymaster-api.reown.com/8453/rpc?projectId=" + projectId, // for base 
                context: {
                  reown: {
                    policyId: "<FILL_YOUR_POLICY_ID>"
                  }
                }
            }
          }
        })
    }



  return (
    isConnected && chainId === 8453 && ( // Only show the buttons if the user is connected to Sepolia
    <div>
        <button onClick={handleReadSmartContract}>Read Sepolia Smart Contract</button>
        <button onClick={handleWriteSmartContract}>Write Sepolia Gasless Smart Contract</button>  
    </div>
    )
  )
}
