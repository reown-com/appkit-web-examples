'use client'

import { useState } from 'react'
import type { WalletItem } from '@reown/appkit'
import type { ChainNamespace } from '@reown/appkit/networks'
import { WalletListItem } from './WalletListItem'
import { NamespaceDialog } from './NamespaceDialog'
import { WalletConnectQRDialog } from './WalletConnectQRDialog'
import { useAppKitWallets } from '@reown/appkit/react'

interface ConnectViewProps {
  onShowAllWallets: () => void
}

export const ConnectView = ({ onShowAllWallets }: ConnectViewProps) => {
  const { wallets, connect, isInitialized, connectingWallet } = useAppKitWallets()
  const [selectedWallet, setSelectedWallet] = useState<WalletItem | null>(null)

  const handleConnect = async (wallet: WalletItem, namespace?: ChainNamespace) => {
    setSelectedWallet(null)
    try {
      await connect(wallet, namespace)
      console.log('Connected successfully!')
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  const handleWalletClick = (wallet: WalletItem) => {
    // If wallet has multiple connectors (chains), show namespace selection
    if (wallet.connectors.length > 1) {
      setSelectedWallet(wallet)
    } else {
      handleConnect(wallet, wallet.connectors[0]?.chain)
    }
  }

  if (!isInitialized) {
    return (
      <div className="connect-view">
        <div className="loading">
          <div className="spinner"></div>
          <p>Initializing wallets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="connect-view">
      <h2>Connect</h2>
      <p className="subtitle">Choose a wallet to connect</p>

      <div className="wallet-list">
        {wallets.map((wallet) => (
          <WalletListItem
            key={wallet.id}
            wallet={wallet}
            onConnect={() => handleWalletClick(wallet)}
            isConnecting={connectingWallet?.id === wallet.id}
          />
        ))}
      </div>

      <button className="all-wallets-button" onClick={onShowAllWallets}>
        View All Wallets
      </button>

      <NamespaceDialog
        wallet={selectedWallet}
        onSelect={handleConnect}
        onClose={() => setSelectedWallet(null)}
      />

      <WalletConnectQRDialog />
    </div>
  )
}
