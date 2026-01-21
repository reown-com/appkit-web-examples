import { useState, useEffect, useRef } from 'react'
import { useAppKitWallets } from '@reown/appkit/react'
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import { WalletListItem } from './WalletListItem'
import { WalletConnectQRDialog } from './WalletConnectQRDialog'

interface AllWalletsViewProps {
  onBack: () => void
}

export const AllWalletsView = ({ onBack }: AllWalletsViewProps) => {
  const {
    wcWallets,
    isFetchingWallets,
    fetchWallets,
    connect,
    page,
    count,
    connectingWallet
  } = useAppKitWallets()

  const { connect: connectWithProvider } = useAppKitWallet()
  const [connectingSocial, setConnectingSocial] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(async () => {
      try {
        setFetchError(null)
        if (value.length > 0) {
          await fetchWallets?.({ query: value })
        } else {
          await fetchWallets?.()
        }
        setSearchQuery(value)
      } catch (err) {
        setFetchError('Failed to search wallets')
        console.error('Wallet search error:', err)
      }
    }, 500)
  }

  // Initial fetch
  useEffect(() => {
    const loadWallets = async () => {
      try {
        setFetchError(null)
        await fetchWallets?.()
      } catch (err) {
        setFetchError('Failed to load wallets')
        console.error('Wallet fetch error:', err)
      }
    }
    loadWallets()
  }, [])

  const handleLoadMore = async () => {
    try {
      setFetchError(null)
      if (searchQuery.length > 0) {
        await fetchWallets?.({ page: page + 1, query: searchQuery })
      } else {
        await fetchWallets?.({ page: page + 1 })
      }
    } catch (err) {
      setFetchError('Failed to load more wallets')
      console.error('Wallet fetch error:', err)
    }
  }

  const handleConnect = async (wallet: typeof wcWallets[0]) => {
    try {
      await connect(wallet)
      console.log('Connected successfully!')
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  const hasMoreWallets = wcWallets.length < count

  const handleSocialConnect = async (provider: 'google' | 'github') => {
    setConnectingSocial(provider)
    try {
      await connectWithProvider(provider)
      console.log(`Connected with ${provider} successfully!`)
    } catch (error) {
      console.error(`${provider} connection failed:`, error)
    } finally {
      setConnectingSocial(null)
    }
  }

  return (
    <div className="all-wallets-view">
      <div className="view-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>All Wallets</h2>
      </div>

      {/* Social Login Section */}
      <div className="social-login-section">
        <p className="social-label">Continue with</p>
        <div className="social-buttons">
          <button
            className="social-button google-button"
            onClick={() => handleSocialConnect('google')}
            disabled={connectingSocial !== null}
          >
            <svg viewBox="0 0 24 24" className="social-icon">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{connectingSocial === 'google' ? 'Connecting...' : 'Google'}</span>
          </button>
          <button
            className="social-button github-button"
            onClick={() => handleSocialConnect('github')}
            disabled={connectingSocial !== null}
          >
            <svg viewBox="0 0 24 24" className="social-icon">
              <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span>{connectingSocial === 'github' ? 'Connecting...' : 'GitHub'}</span>
          </button>
        </div>
        <div className="divider">
          <span>or connect a wallet</span>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search wallets..."
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {fetchError && (
        <div className="error-message">
          <p>{fetchError}</p>
          <button onClick={() => handleSearch(searchQuery)}>Retry</button>
        </div>
      )}

      {isFetchingWallets && wcWallets.length === 0 ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading wallets...</p>
        </div>
      ) : (
        <>
          <div className="wallet-grid">
            {wcWallets.map((wallet) => (
              <WalletListItem
                key={wallet.id}
                wallet={wallet}
                onConnect={() => handleConnect(wallet)}
                isConnecting={connectingWallet?.id === wallet.id}
              />
            ))}
          </div>

          {wcWallets.length === 0 && !isFetchingWallets && (
            <div className="no-results">
              <p>No wallets found for "{searchQuery}"</p>
            </div>
          )}

          {hasMoreWallets && (
            <button 
              className="load-more-button" 
              onClick={handleLoadMore}
              disabled={isFetchingWallets}
            >
              {isFetchingWallets ? 'Loading...' : 'Load More'}
            </button>
          )}

          <p className="wallet-count">
            Showing {wcWallets.length} of {count} wallets
          </p>
        </>
      )}

      <WalletConnectQRDialog />
    </div>
  )
}
