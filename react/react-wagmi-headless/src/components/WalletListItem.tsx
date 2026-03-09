import { useState } from 'react'
import type { WalletItem } from '@reown/appkit'

interface WalletListItemProps {
  wallet: WalletItem
  onConnect: () => void
  isConnecting?: boolean
}

// Fallback wallet icon as a simple SVG
const FallbackIcon = () => (
  <div className="wallet-icon wallet-icon-fallback">
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#e0e0e0"/>
      <path d="M12 16h16v2H12v-2zm0 6h16v2H12v-2z" fill="#999"/>
    </svg>
  </div>
)

export const WalletListItem = ({ wallet, onConnect, isConnecting }: WalletListItemProps) => {
  const [imageError, setImageError] = useState(false)
  
  // Get the icon URL - wallet.icon might be a string URL or undefined
  const iconUrl = wallet.imageUrl

  return (
    <button 
      className="wallet-item" 
      onClick={onConnect}
      disabled={isConnecting}
    >
      {iconUrl && !imageError ? (
        <img 
          src={iconUrl} 
          alt={wallet.name} 
          className="wallet-icon"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <FallbackIcon />
      )}
      <span className="wallet-name">{wallet.name}</span>
      {isConnecting && <span className="connecting-indicator">...</span>}
    </button>
  )
}
