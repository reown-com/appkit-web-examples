import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'
import { AppKitPay } from './components/AppKitPay'

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
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function App() {
  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>AppKit Pay Example</h1>
      <h3>Purchase delicious donuts using your favorite cryptocurrency</h3>
      <br></br>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            <AppKitPay />
            <div className="circle">
              <a href="https://github.com/reown-com/appkit-web-examples/tree/main/react/react-wagmi-appkit-pay" target="_blank"><img src="/github.png" alt="GitHub" width="50" /></a>
            </div>
            <br />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
