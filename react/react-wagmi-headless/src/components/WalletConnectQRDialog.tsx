import { useAppKitWallets } from '@reown/appkit/react'

export const WalletConnectQRDialog = () => {
  const { wcUri, connectingWallet, isFetchingWcUri, resetWcUri } = useAppKitWallets()

  if (!wcUri && !isFetchingWcUri) return null

  const handleClose = () => {
    resetWcUri()
  }

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div className="dialog qr-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>
            {connectingWallet ? `Connect to ${connectingWallet.name}` : 'Scan QR Code'}
          </h3>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="dialog-content qr-content">
          {isFetchingWcUri ? (
            <div className="loading-qr">
              <div className="spinner"></div>
              <p>Generating QR Code...</p>
            </div>
          ) : wcUri ? (
            <>
              <div className="qr-code-container">
                {/* Using a simple QR code representation - in production you'd use a QR library */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(wcUri)}`}
                  alt="WalletConnect QR Code"
                  className="qr-code"
                />
              </div>
              <p className="qr-instructions">
                Scan this QR code with your wallet app to connect
              </p>
              <div className="uri-container">
                <input 
                  type="text" 
                  value={wcUri} 
                  readOnly 
                  className="uri-input"
                />
                <button 
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(wcUri)}
                >
                  Copy
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
