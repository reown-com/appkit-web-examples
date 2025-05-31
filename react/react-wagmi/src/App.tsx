
import { AppKitWagmiProvider } from './components/AppKitWagmiProvider'
import { projectId, metadata, networks, features } from './config'
import "./App.css"

export function App() {
  return (
    <div>
      <AppKitWagmiProvider projectId={projectId} networks={networks} metadata={metadata} features={features} >
            <appkit-button />
      </AppKitWagmiProvider>
    </div>
  )
}

export default App
