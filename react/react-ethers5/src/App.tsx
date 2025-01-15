import { createAppKit } from '@reown/appkit/react'
import { projectId, metadata, networks, ethers5Adapter  } from './config'
import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'

import "./App.css"

// Create a AppKit instance
createAppKit({
  adapters: [ethers5Adapter],
  networks,
  metadata,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },  
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export function App() {

  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit ethers v5 React dApp Example</h1>
      <appkit-button />
      <ActionButtonList />
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
        </p>
      </div>
      <InfoList />
    </div>
  )
}

export default App
