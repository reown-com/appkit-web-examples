import { createAppKit, AppKitProvider } from '@reown/appkit/react'

import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'

import { ActionButtonList } from './components/ActionButtonList'
import { SmartContractActionButtonList } from './components/SmartContractActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter, queryClient } from './config'

import './App.css'

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000'
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function AppKitProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider {...generalConfig}>{children}</AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export function App() {
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined)
  const [signedMsg, setSignedMsg] = useState('')
  const [balance, setBalance] = useState('')

  const receiveHash = (hash: `0x${string}`) => {
    setTransactionHash(hash)
  }

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg)
  }

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div className={'pages'}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Wagmi React dApp Example</h1>
      <AppKitProviderWrapper>
        <appkit-button />
        <ActionButtonList
          sendHash={receiveHash}
          sendSignMsg={receiveSignedMsg}
          sendBalance={receivebalance}
        />
        <SmartContractActionButtonList />
        <div className="advice">
          <p>
            This projectId only works on localhost. <br />
            Go to{' '}
            <a
              href="https://dashboard.reown.com"
              target="_blank"
              className="link-button"
              rel="Reown Dashboard"
            >
              Reown Dashboard
            </a>{' '}
            to get your own.
          </p>
        </div>
        <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance} />
      </AppKitProviderWrapper>
    </div>
  )
}

export default App
