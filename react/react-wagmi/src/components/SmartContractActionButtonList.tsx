//
// if you are not going to read or write smart contract, you can delete this file
//

import { useAppKitNetwork, useAppKitAccount } from '@reown/appkit/react'
import { useWriteContract } from 'wagmi'
import { useEffect } from 'react'

const createBucketABI = [
  {
    inputs: [
      { name: 'mspId', type: 'bytes32' },
      { name: 'name', type: 'bytes' },
      { name: '_private', type: 'bool' },
      { name: 'valuePropId', type: 'bytes32' }
    ],
    name: 'createBucket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const contractAddress = '0x0000000000000000000000000000000000000404'
const DATAHAVEN_TESTNET_CHAIN_ID = 55931

export const SmartContractActionButtonList = () => {
  const { isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const { writeContract, isSuccess, isPending, error } = useWriteContract()

  useEffect(() => {
    if (isSuccess) {
      console.log('createBucket contract write success')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      console.error('createBucket error:', error)
    }
  }, [error])

  const handleCreateBucket = () => {
    console.log('Calling createBucket on DataHaven Testnet')
    writeContract({
      address: contractAddress,
      abi: createBucketABI,
      functionName: 'createBucket',
      args: [
        '0x0000000000000000000000000000000000000000000000000000000000000001', // mspId
        '0x746573742d736f6369616c2d776974682d72656f776e2d636861696e', // name ("test-social-with-reown-chain" in hex)
        false, // _private
        '0x628a23c7aa64902e13f63ffdd0725e07723745f84cabda048d901020d200da1e' // valuePropId
      ]
    })
  }

  return (
    isConnected &&
    chainId === DATAHAVEN_TESTNET_CHAIN_ID && (
      <div>
        <button onClick={handleCreateBucket} disabled={isPending}>
          {isPending ? 'Creating Bucket...' : 'Create Bucket (DataHaven)'}
        </button>
      </div>
    )
  )
}
