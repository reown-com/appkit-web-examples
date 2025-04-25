//
// if you are not going to read or write smart contract, you can delete this file
//

import { useAppKitNetwork, useAppKitAccount, useDisconnect  } from '@reown/appkit/react'
import { useReadContract } from 'wagmi'
import { useState } from 'react'
import { grantPermissions, SmartSessionGrantPermissionsRequest, SmartSessionGrantPermissionsResponse } from '@reown/appkit-experimental/smart-session'
import { toHex } from 'viem'

import { storageABI, storageSC, apiURL, storeFunctionName } from '../config/configSmartSession'

export const SmartSessionActionButtonList = () => {

  const [permissions, setPermissions] = useState<SmartSessionGrantPermissionsResponse>({} as SmartSessionGrantPermissionsResponse);
  const [ECDSAPublicKey, setECDSAPublicKey] = useState<string>("");
    const { isConnected, address } = useAppKitAccount() 
    const { disconnect } = useDisconnect()
    const { chainId } = useAppKitNetwork()
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
      console.log("readContract: ", data)
    }

    // 2. Grant Permissions
    const handleGrantPermissions = async () => {
      if (isConnected) {
        console.log("Call Smart Session Grant Permissions")
        // chainId <> undefined
        const response = await fetch(`${apiURL}/api/signer`);
        const { publicKey: dAppECDSAPublicKey } = await response.json();
        setECDSAPublicKey(dAppECDSAPublicKey);
        const dataForRequest = getDataForRequest(dAppECDSAPublicKey);
        const request = generateRequest(dataForRequest);

      
        // Grant permissions for smart session
        // This step requests permission from the user's wallet to allow the dApp to make contract calls on their behalf
        // Once approved, these permissions will be used to create a smart session on the backend
        const approvedPermissions = await grantPermissions(request);

        setPermissions(approvedPermissions);
      } else {
        console.log("Please connect your wallet to call Smart Session Grant Permissions")
      }
    }



     // 3. Write Smart Contract
    const handleWriteSmartContract = async () => {
      console.log("Write Sepolia Smart Contract");

      // Call the backend API to create a smart session using the approved permissions
      // The backend will store these permissions and use them to make contract calls on behalf of the user
      // This enables automated/scheduled transactions without requiring user interaction each time
      const responseSS = await fetch(`${apiURL}/api/executeFunction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permissions: permissions,
          data: getDataForRequest()
        }),
      });

      console.log("response Smart Session", responseSS);
  } 

    const getDataForRequest = (publickey = "") => {
      if (publickey === "") {
        publickey = ECDSAPublicKey;
      }
      return {
        dAppECDSAPublicKey: publickey as `0x${string}`,
        contractAddress: storageSC as `0x${string}`,
        abi: storageABI,
        functionName: storeFunctionName,
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
    chainId === 84532 && (
      <div>
        <div>
          <br/>
          <b>Steps to try Smart Sessions</b><br/>
          <button onClick={handleReadSmartContract}>1. Read Smart Contract</button>
          <button onClick={handleGrantPermissions}>2. Grant Permissions</button>
          <button onClick={() => disconnect()}>3. Disconnect</button>
          <button onClick={handleWriteSmartContract}>4. Write Smart Contract without signing</button>
          <button onClick={handleReadSmartContract}>5. Read Smart Contract</button>
        </div>
      </div>
    )
  )
}
