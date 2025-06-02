import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { ReactNode, useMemo } from 'react' 

const queryClient = new QueryClient()

interface AppKitWagmiProviderProps {
  children: ReactNode;
  projectId: string;
  networks: [AppKitNetwork, ...AppKitNetwork[]];
  metadata: {
    name: string;
    description: string;
    url: string;
    icons: string[];
  };
  features: {
    analytics: boolean;
    swaps: boolean;
  };
}

export const AppKitWagmiProvider = ({ children, projectId, networks, metadata, features }: AppKitWagmiProviderProps) => {
  const [wagmiAdapter, _] = useMemo(() => {
    const adapter = new WagmiAdapter({ projectId, networks })
  
    const appkit = createAppKit({
      adapters: [adapter],
      projectId,
      networks,
      metadata,
      features
    })
  
    return [adapter, appkit]
  }, [projectId, networks, metadata, features])

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
  )
}
