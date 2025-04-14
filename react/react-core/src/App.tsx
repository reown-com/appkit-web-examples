import { createAppKit } from '@reown/appkit/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActionButtonList } from './components/ActionButtonList'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks } from './config'

import "./App.css"

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  ...generalConfig,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: [],
    email: false
  }
})

export function App() {
  


  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Core React dApp Example</h1>
        <QueryClientProvider client={queryClient}>
            <appkit-button />
            <ActionButtonList />
            <div className="advice">
              <p>
                This projectId only works on localhost. <br/>
                Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
              </p>
            </div>
            <InfoList />
        </QueryClientProvider>
    </div>
  )
}

export default App
