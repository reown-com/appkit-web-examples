//
// if you are not going to read or write smart contract, you can delete this file
//

import { useAppKitNetwork, useAppKitAccount, useDisconnect  } from '@reown/appkit/react'
import { useReadContract } from 'wagmi'
import {  useState } from 'react'
import { grantPermissions, SmartSessionGrantPermissionsRequest, SmartSessionGrantPermissionsResponse } from '@reown/appkit-experimental/smart-session'
import { toHex } from 'viem'

const storageABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const storageSC = "0xEe6D291CC60d7CeD6627fA4cd8506912245c8cA4" 

export const SmartSessionActionButtonList = () => {

  const [permissions, setPermissions] = useState<SmartSessionGrantPermissionsResponse>({} as SmartSessionGrantPermissionsResponse);
  const [ECDSAPublicKey, setECDSAPublicKey] = useState<string>("");
    const { isConnected, address } = useAppKitAccount() 
    const { disconnect } = useDisconnect()
    const { chainId } = useAppKitNetwork()
    //const { writeContract, isSuccess } = useWriteContract()
    const readContract = useReadContract({
      address: storageSC,
      abi: storageABI,
      functionName: 'retrieve',
      query: {
        enabled: false, // disable the query in onload
      }
    })


    // 1. Read Smart Contract
    const handleReadSmartContract = async () => {
      console.log("Read Sepolia Smart Contract");
      const { data } = await readContract.refetch();
      console.log("data: ", data)
    }

    // 2. Grant Permissions
    const handleGrantPermissions = async () => {
      console.log("Call Smart Session Grant Permissions")
      // chainId <> undefined
      const response = await fetch("/api/signer");
      const { key: dAppECDSAPublicKey } = await response.json();
      console.log("dAppECDSAPublicKey: ", dAppECDSAPublicKey);
      setECDSAPublicKey(dAppECDSAPublicKey);
      const dataForRequest = getDataForRequest();
      
      // Grant permissions for smart session
      // This step requests permission from the user's wallet to allow the dApp to make contract calls on their behalf
      // Once approved, these permissions will be used to create a smart session on the backend
      const approvedPermissions = await grantPermissions(generateRequest(dataForRequest));

      console.log("approvedPermissions", approvedPermissions);
      setPermissions(approvedPermissions);
    }



     // 3. Write Smart Contract
    const handleWriteSmartContract = async () => {
      console.log("Write Sepolia Smart Contract")
      // Call the backend API to create a smart session using the approved permissions
      // The backend will store these permissions and use them to make contract calls on behalf of the user
      // This enables automated/scheduled transactions without requiring user interaction each time
      const responseSS = await fetch("/api/create-smart-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permissions: permissions,
          data: getDataForRequest()
        }),
      });

      console.log("responseSS", responseSS);
  } 

    const getDataForRequest = () => {
      return {
        dAppECDSAPublicKey: ECDSAPublicKey as `0x${string}`,
        contractAddress: storageSC as `0x${string}`,
        abi: storageABI,
        functionName: 'store',
        expiry: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Default 24 hours 
        userAddress: address as `0x${string}`, // Default actual address
        chainId: Number(chainId), // Default actual chain
      };
    }

    type dataForRequestType = {
      chainId: number,
      expiry: number,
      dAppECDSAPublicKey: `0x${string}`,
      userAddress: `0x${string}`,
      contractAddress: `0x${string}`,
      abi: any[],
      functionName: string
    }

    const generateRequest = (dataForRequest: dataForRequestType) => {
      const request: SmartSessionGrantPermissionsRequest = {
        expiry: dataForRequest.expiry,
        chainId: toHex(dataForRequest.chainId),
        address: dataForRequest.userAddress as `0x${string}`,
        signer: {
          type: 'keys',
          data: {
            keys :[{
            type: 'secp256k1',
            publicKey: dataForRequest.dAppECDSAPublicKey
          }]
          }
        },
        permissions: [ {
          type: 'contract-call',
          data: {
            address: dataForRequest.contractAddress,
            abi: dataForRequest.abi,
            functions: [ {
              functionName: dataForRequest.functionName
            } ]
          }
        }],
        policies: []
      }
      return request;
    }


  return (
    isConnected && chainId === 11155111 && (
      <div>
        <div>
          <b>Steps to try Smart Sessions</b>
          <div>1. Read the Smart Contract</div>
          <button onClick={handleReadSmartContract}>Read Smart Contract</button>
          <div>2. Grant Permissions</div>
          <button onClick={handleGrantPermissions}>Grant Permissions</button>
          <div>3. You can disconnect your account</div>
          <button onClick={() => disconnect()}>Disconnect</button>
          <div>4. Make a call on your behalf</div>
          <button onClick={handleWriteSmartContract}>Write Smart Contract without signing</button>
          <div>5. Read again the Smart Contract to view the change</div>
          <button onClick={handleReadSmartContract}>Read Smart Contract</button>
        </div>
      </div>
    )
  )
}
