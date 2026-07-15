import { createAppKit } from '@reown/appkit/react'
import { networks, projectId, metadata, ethersAdapter } from './config'
import { ActionButtonList } from './components/ActionButtonList'
import { SmartContractActionButtonList } from './components/SmartContractActionButtonList'
import { InfoList } from './components/InfoList'
import { useState } from 'react'

import { ReownAuthentication } from '@reown/appkit-siwx'

import "./App.css"

// Create a AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'light',
  // Use ReownAuthentication (Cloud Auth) as the SIWX provider.
  // `required: true` forces users to sign in (SIWX) right after connecting their wallet.
  siwx: new ReownAuthentication({ required: true }),
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState('');
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');


  const receiveHash = (hash: string) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Ethers + SIWX React dApp Example</h1>
          <appkit-button />
          <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance}/>
          <SmartContractActionButtonList />
          <div className="advice">
            <p>
              This projectId only works on localhost. <br/>
              Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
            </p>
          </div>
          <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/>
    </div>
  )
}

export default App
