//
// Deploys an AppKit Smart Account (ERC-4337) with the cheapest possible transaction.
//
// A smart account contract is only deployed on-chain on its FIRST transaction.
// The cheapest way to trigger that deployment is a 0-value transaction sent to
// the account's own address (a no-op self-transfer). The bundler bundles the
// account-deployment together with this empty call, so you only pay for the
// deployment itself.
//

import { useEffect } from 'react'
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { useBytecode, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import type { Address } from 'viem'

export const SmartAccountDeployButton = () => {
  const { address, isConnected, embeddedWalletInfo } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()

  // A smart account is "deployed" once there is bytecode at its address.
  const { data: bytecode, isLoading: isCheckingDeployment, refetch: refetchBytecode } =
    useBytecode({
      address: address as Address,
      query: { enabled: Boolean(address) },
    })

  const { data: hash, sendTransaction, isPending, error } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const isSmartAccount = embeddedWalletInfo?.accountType === 'smartAccount'
  const isDeployed = Boolean(bytecode && bytecode !== '0x')

  // Once the deployment tx is confirmed, re-check the bytecode so the UI updates.
  useEffect(() => {
    if (isConfirmed) {
      refetchBytecode()
    }
  }, [isConfirmed, refetchBytecode])

  // The cheapest deployment trigger: a 0-value, empty-data tx to the account itself.
  const handleDeploy = () => {
    if (!address) return
    sendTransaction({
      to: address as Address,
      value: 0n,
    })
  }

  // Only relevant for EVM smart accounts that are not yet deployed.
  if (!isConnected || !isSmartAccount) {
    return null
  }

  return (
    <section>
      <h2>Smart Account Deployment</h2>
      <pre>
        Address: {address}<br />
        Network (chainId): {chainId?.toString()}<br />
        Deployed: {isCheckingDeployment ? 'checking…' : isDeployed.toString()}<br />
      </pre>

      {isDeployed ? (
        <p>✅ Your smart account is already deployed on this network.</p>
      ) : (
        <>
          <p>
            Your smart account is not deployed yet on this network. Deploy it with
            the cheapest possible transaction (a 0-value self-transfer).
          </p>
          <button onClick={handleDeploy} disabled={isPending || isConfirming}>
            {isPending
              ? 'Confirm in wallet…'
              : isConfirming
                ? 'Deploying…'
                : 'Deploy Smart Account (cheapest tx)'}
          </button>
        </>
      )}

      {hash && (
        <pre>
          Tx Hash: {hash}<br />
          {isConfirming && 'Waiting for confirmation…'}
          {isConfirmed && '✅ Smart account deployed!'}
        </pre>
      )}

      {error && (
        <pre>Error: {error.message}</pre>
      )}
    </section>
  )
}
