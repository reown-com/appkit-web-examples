'use client'
import { useState } from 'react'
import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitBalance,
} from '@reown/appkit/react'
import type { TronConnector } from '@reown/appkit-adapter-tron'
import { networks } from '@/config'

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()
  const { switchNetwork } = useAppKitNetwork()
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider<TronConnector>('tron')
  const { fetchBalance } = useAppKitBalance()

  const [signature, setSignature] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  const handleDisconnect = async () => {
    try {
      await disconnect()
      setSignature('')
      setBalance('')
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  const handleSignMessage = async () => {
    if (!walletProvider || !address) return
    try {
      const sig = await walletProvider.signMessage({
        message: 'Hello from AppKit Tron example!',
        from: address,
      })
      setSignature(sig)
    } catch (error) {
      console.error('Failed to sign message:', error)
    }
  }

  const handleGetBalance = async () => {
    const result = await fetchBalance()
    if (result.isSuccess && result.data) {
      setBalance(`${result.data.balance} ${result.data.symbol}`)
    } else {
      console.error('Failed to fetch balance:', result.error)
    }
  }

  return (
    <>
      <div>
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={() => switchNetwork(networks[1])}>Switch</button>
        <button onClick={handleSignMessage} disabled={!isConnected}>
          Sign Message
        </button>
        <button onClick={handleGetBalance} disabled={!isConnected}>
          Get Balance
        </button>
      </div>
      {(signature || balance) && (
        <section>
          <h2>Actions</h2>
          <pre>
            {balance && (<>Balance: {balance}<br /></>)}
            {signature && (<>Signature: {signature}</>)}
          </pre>
        </section>
      )}
    </>
  )
}
