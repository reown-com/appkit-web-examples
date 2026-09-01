import { useState } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter, tronAdapter } from './config'

import "./App.css"

const queryClient = new QueryClient()

// Create modal
createAppKit({
  adapters: [wagmiAdapter, tronAdapter],
  projectId,
  metadata,
  networks,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export function App() {
  const [evmSignedMsg, setEvmSignedMsg] = useState('');
  const [tronSignedMsg, setTronSignedMsg] = useState('');

  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Wagmi + Tron React dApp Example</h1>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <appkit-button />
          <ActionButtonList sendEvmSignedMsg={setEvmSignedMsg} sendTronSignedMsg={setTronSignedMsg} />
          <div className="advice">
            <p>
              This projectId only works on localhost. <br/>
              Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
            </p>
          </div>
          <InfoList evmSignedMsg={evmSignedMsg} tronSignedMsg={tronSignedMsg} />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
