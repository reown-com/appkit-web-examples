import { useState, useEffect } from 'react'

import { ActionButtonList } from './components/ActionButtonList'
import { initializeProvider, initializeModal } from './config'
import UniversalProvider from '@walletconnect/universal-provider'

import "./App.css"

export function App() {
  const [provider, setProvider] = useState<UniversalProvider>();
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const init = async () => {
      const dataProvider = await initializeProvider();
      console.log("dataProvider", dataProvider);
      initializeModal(dataProvider);
      setProvider(dataProvider);
    }
    init()
  }, [])
      
  useEffect(() => {
    const handleDisplayUri = (uri: string) => {
      const modal = initializeModal(provider)
      modal?.open({ uri, view: 'ConnectingWalletConnectBasic' })
    }

    const handleConnect = async (session: any) => {
      console.log("session", session);
      const modal = initializeModal(provider)
      await modal?.close()
      
      setAddress(session?.session?.namespaces['polkadot']?.accounts?.[0]?.split(':')[2])
    }

    provider?.on('display_uri', handleDisplayUri)
    provider?.on('connect', handleConnect)
  }, [provider])


  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit React AppKit Core Example</h1>
      <h2> UP + Polkadot</h2>
            <ActionButtonList  provider={provider} address={address} />
            <div className="advice">
              <p>
                This projectId only works on localhost. <br/>
                Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
              </p>
            </div>
    </div>
  )
}

export default App
