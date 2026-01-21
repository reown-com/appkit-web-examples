import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAppKitAccount } from '@reown/appkit/react'

import { ConnectView } from './components/ConnectView'
import { AllWalletsView } from './components/AllWalletsView'
import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter } from './config'

import "./App.css"

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create AppKit with headless mode enabled
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true,
    headless: true // Enable headless mode for custom UI
  }
})

type ViewState = 'connect' | 'all-wallets'

// Connected state component
const ConnectedView = () => {
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined)
  const [signedMsg, setSignedMsg] = useState('')
  const [balance, setBalance] = useState('')

  return (
    <>
      <h2>Connected!</h2>
      <ActionButtonList 
        sendHash={setTransactionHash} 
        sendSignMsg={setSignedMsg} 
        sendBalance={setBalance}
      />
      {balance && (
        <section>
          <h2>Balance: {balance}</h2>
        </section>
      )}
      {transactionHash && (
        <section>
          <h2>Transaction</h2>
          <pre>Hash: {transactionHash}</pre>
        </section>
      )}
      {signedMsg && (
        <section>
          <h2>Signed Message</h2>
          <pre>Signature: {signedMsg}</pre>
        </section>
      )}
      <InfoList />
    </>
  )
}

// Main content that uses hooks
const AppContent = () => {
  const { isConnected } = useAppKitAccount()
  const [currentView, setCurrentView] = useState<ViewState>('connect')

  return (
    <div className="pages">
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Headless Example</h1>
      <p className="description">
        Build your own custom wallet connection UI with AppKit's Headless mode
      </p>

      {isConnected ? (
        <ConnectedView />
      ) : (
        <div className="headless-container">
          {currentView === 'connect' ? (
            <ConnectView onShowAllWallets={() => setCurrentView('all-wallets')} />
          ) : (
            <AllWalletsView onBack={() => setCurrentView('connect')} />
          )}
        </div>
      )}

      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="noreferrer">Reown Dashboard</a> to get your own.
        </p>
      </div>
    </div>
  )
}

export function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
