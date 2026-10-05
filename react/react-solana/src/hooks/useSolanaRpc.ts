import { useMemo } from 'react'
import { useAppKitNetwork } from '@reown/appkit/react'
import { createSolanaRpc } from '@solana/kit'

// Solana Kit RPC client for the active network
export const useSolanaRpc = () => {
  const { caipNetwork } = useAppKitNetwork()
  const rpcUrl = caipNetwork?.rpcUrls.default.http[0]

  return useMemo(() => (rpcUrl ? createSolanaRpc(rpcUrl) : undefined), [rpcUrl])
}
