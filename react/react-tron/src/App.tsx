import { createAppKit } from '@reown/appkit/react'
import { useState } from 'react'
import { metadata, networks, projectId, tronAdapter } from './config'
import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'

import "./App.css"

// Create modal
createAppKit({
  projectId,
  metadata,
  themeMode: 'light',
  networks,
  adapters: [tronAdapter],
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000'
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');
  const [usdtHash, setUsdtHash] = useState('');
  const [error, setError] = useState('');

  const receiveHash = (hash: string) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  const receiveUsdtHash = (hash: string) => {
    setUsdtHash(hash); // Update the state with the USDT transfer hash
  };

  const receiveError = (error: string) => {
    setError(error)
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h2>Reown AppKit + TRON</h2>
      <appkit-button />
      <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance} sendUsdtHash={receiveUsdtHash} sendError={receiveError}/>
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
        </p>
      </div>
      <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance} usdtHash={usdtHash} error={error}/>
    </div>
  )
}

export default App
