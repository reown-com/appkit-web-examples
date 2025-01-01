import { createAppKit } from '@reown/appkit/react'
import { useState } from 'react'
import { networks, projectId, metadata, bitcoinAdapter } from './config'
import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'

import "./App.css"

// Create a AppKit instance
createAppKit({
  adapters: [bitcoinAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: [],
    email: false
  }
})

export function App() {
/*   sendSignPSBT: (hash: string ) => void;
  sendSignMsg: (hash: string) => void;
  sendSendTx: (hash: string) => void; */

  const [psbt, setPSBT] = useState<string>("");
  const [signedMsg, setSignedMsg] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  
  const receivePSBT = (hash: string) => {
    setPSBT(hash);
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receiveTxHash= (hash: string) => {
    setTxHash(hash)
  }

  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit bitcoin React dApp Example</h1>
          <appkit-button />
          <ActionButtonList sendSignPSBT={receivePSBT} sendSignMsg={receiveSignedMsg} sendSendTx={receiveTxHash} />
          <div className="advice">
            <p>
              This projectId only works on localhost. <br/>
              Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
            </p>
          </div>
          <InfoList psbt={psbt} signedMsg={signedMsg} txHash={txHash} />
    </div>
  )
}

export default App
