import { useState, useEffect } from 'react'
import { ActionButtonList } from './components/ActionButtonList'
import { getUniversalConnector } from './config'
import { UniversalConnector } from '@reown/appkit-universal-connector'
import "./App.css"

export function App() {
  const [universalConnector, setUniversalConnector] = useState<UniversalConnector>()
  const [session, setSession] = useState<any>()

  useEffect(() => {
    getUniversalConnector().then(setUniversalConnector)
  }, [])

  useEffect(() => {
    setSession(universalConnector?.provider.session)
  }, [universalConnector?.provider.session])


  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>WalletConnect React Example</h1>
      <h2> Universal Connector + TON</h2>
            <ActionButtonList session={session} universalConnector={universalConnector} setSession={setSession} />
            <div className="advice">
              <p>
                This projectId only works on localhost. <br/>
                Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
              </p>
            </div>
    </div>
  )
}

export default App
