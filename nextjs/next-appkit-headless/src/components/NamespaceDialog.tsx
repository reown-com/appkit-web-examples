'use client'

import type { WalletItem } from '@reown/appkit'
import type { ChainNamespace } from '@reown/appkit/networks'

interface NamespaceDialogProps {
  wallet: WalletItem | null
  onSelect: (wallet: WalletItem, namespace: ChainNamespace) => void
  onClose: () => void
}

export const NamespaceDialog = ({ wallet, onSelect, onClose }: NamespaceDialogProps) => {
  if (!wallet) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>Select Network Type</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="dialog-content">
          <p>Choose which network to connect with {wallet.name}:</p>
          <div className="namespace-list">
            {wallet.connectors.map((connector) => (
              <button
                key={connector.chain}
                className="namespace-button"
                onClick={() => onSelect(wallet, connector.chain)}
              >
                <span className="namespace-name">
                  {connector.chain === 'eip155' ? 'Ethereum (EVM)' :
                   connector.chain === 'solana' ? 'Solana' :
                   connector.chain === 'bip122' ? 'Bitcoin' :
                   connector.chain}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
