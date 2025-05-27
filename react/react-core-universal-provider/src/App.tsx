import { useState, useEffect } from 'react'

import { ActionButtonList } from './components/ActionButtonList'
import { initializeProvider, initializeModal } from './config'
import UniversalProvider from '@walletconnect/universal-provider'

import "./App.css"

export function App() {
  const [provider, setProvider] = useState<UniversalProvider>();
  const [address, setAddress] = useState<string>();
  const [session, setSession] = useState<any>();
  useEffect(() => {
    const init = async () => {
      const dataProvider = await initializeProvider();
      setProvider(dataProvider);
      console.log("dataProvider", dataProvider);
      initializeModal(dataProvider);

      if (dataProvider.session) { // check if there is a session
        console.log("dataProvider.session", dataProvider.session);
        setSession(dataProvider.session);
      }
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
      setSession(session.session);
      const modal = initializeModal(provider)
      await modal?.close()
    }

    provider?.on('display_uri', handleDisplayUri)
    provider?.on('connect', handleConnect)

    return () => {
      provider?.removeListener('connect', handleConnect)
      provider?.removeListener('display_uri', handleDisplayUri)
    }
  }, [provider])

  useEffect(() => {
    setAddress(session?.namespaces['polkadot']?.accounts?.[0]?.split(':')[2])
  }, [session])


  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit React AppKit Core Example</h1>
      <h2> UP + Polkadot</h2>
            <ActionButtonList  setSession={setSession} session={session} provider={provider} address={address} />
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
