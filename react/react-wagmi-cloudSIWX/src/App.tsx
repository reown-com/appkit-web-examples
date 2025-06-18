import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { InfoList } from './components/InfoList'
import { projectId, metadata, networks, wagmiAdapter } from './config'

import { CloudAuthSIWX } from '@reown/appkit-siwx'
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { ConnectButton } from './components/ConnectButton'
import enTranslations from '@shopify/polaris/locales/en.json';

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
  siwx: new CloudAuthSIWX(),
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function App() {
  const [transactionHash] = useState<`0x${string}` | undefined>(undefined);
  const [signedMsg] = useState('');
  const [balance] = useState('');

  return (
    <AppProvider i18n={enTranslations}>
      <div className={"pages"}>
        <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
        <h1>AppKit Wagmi + SIWXReact dApp Example</h1>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
              <ConnectButton />
              <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/>
          </QueryClientProvider>
        </WagmiProvider>
      </div>
    </AppProvider>
  );
}

export default App
