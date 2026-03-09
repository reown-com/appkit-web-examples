'use client'

import { useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import Image from 'next/image'

import { ConnectView } from '@/components/ConnectView'
import { AllWalletsView } from '@/components/AllWalletsView'
import { ActionButtonList } from '@/components/ActionButtonList'
import { InfoList } from '@/components/InfoList'

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

export default function Home() {
  const { isConnected } = useAppKitAccount()
  const [currentView, setCurrentView] = useState<ViewState>('connect')

  return (
    <div className="pages">
      <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
      <h1>AppKit Headless Example</h1>
      <p className="description">
        Build your own custom wallet connection UI with AppKit&apos;s Headless mode
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
