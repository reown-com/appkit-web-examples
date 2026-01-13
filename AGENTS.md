# AppKit Web Examples

This repository contains example projects for integrating [Reown AppKit](https://docs.reown.com/appkit/overview) - an all-in-one SDK for Web3 wallet connections, transactions, and authentication.

## Project Structure

```
react/          # React + Vite examples
vue/            # Vue 3 + Vite examples
nextjs/         # Next.js App Router examples
javascript/     # Vanilla JS + Vite examples
```

### Example Types by Blockchain Adapter

| Adapter | Description | Key Package |
|---------|-------------|-------------|
| `wagmi` | Multi-chain EVM (recommended) | `@reown/appkit-adapter-wagmi` |
| `ethers` | Ethers.js v6 integration | `@reown/appkit-adapter-ethers` |
| `solana` | Solana blockchain | `@reown/appkit-adapter-solana` |
| `bitcoin` | Bitcoin blockchain | `@reown/appkit-adapter-bitcoin` |
| `multichain` | Combined wagmi + Solana | Multiple adapters |

## Quick Start Pattern

### 1. Install Dependencies

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

### 2. Configure AppKit

```typescript
// config/index.tsx
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

const projectId = 'YOUR_PROJECT_ID' // Get from https://cloud.reown.com

export const networks = [mainnet, arbitrum]

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})
```

### 3. Initialize AppKit

```typescript
// main.tsx or App.tsx
import { createAppKit } from '@reown/appkit/react'
import { wagmiAdapter, networks } from './config'

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId: 'YOUR_PROJECT_ID',
  metadata: {
    name: 'My App',
    description: 'My App Description',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png']
  }
})
```

### 4. Wrap Your App

```tsx
// React
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <YourApp />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### 5. Use AppKit Components

```tsx
// Connect button (opens modal)
<appkit-button />

// Or use hooks
import { useAppKit } from '@reown/appkit/react'

function ConnectButton() {
  const { open } = useAppKit()
  return <button onClick={() => open()}>Connect Wallet</button>
}
```

## Common File Structure

```
src/
├── config/
│   └── index.tsx         # AppKit & adapter configuration
├── components/
│   ├── ActionButtonList  # Wallet action buttons
│   └── InfoList          # Display wallet info
├── App.tsx               # Main app component
└── main.tsx              # Entry point with providers
```

## Key Hooks (React/Vue)

```typescript
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'

// Modal controls
const { open, close } = useAppKit()

// Account state
const { address, isConnected, caipAddress } = useAppKitAccount()

// Network state
const { chainId, caipNetwork } = useAppKitNetwork()
```

## Framework-Specific Notes

### React
- Uses Vite for development
- Requires `WagmiProvider` + `QueryClientProvider`

### Vue
- Uses `@wagmi/vue` for Vue-specific hooks
- Uses `@tanstack/vue-query` for queries

### Next.js
- Configuration must be in a Client Component (`'use client'`)
- Uses App Router pattern with `layout.tsx` providers

### Vanilla JavaScript
- Uses `@wagmi/core` instead of React hooks
- Direct DOM manipulation for UI updates

## Environment Variables

Create `.env` or `.env.local`:

```
VITE_PROJECT_ID=your_project_id_here
# or for Next.js
NEXT_PUBLIC_PROJECT_ID=your_project_id_here
```

## Running Examples

```bash
cd react/react-wagmi  # or any example
npm install
npm run dev
```

## Resources

- [AppKit Docs](https://docs.reown.com/appkit/overview)
- [React Quickstart](https://docs.reown.com/appkit/react/core/installation)
- [Next.js Quickstart](https://docs.reown.com/appkit/next/core/installation)
- [Vue Quickstart](https://docs.reown.com/appkit/vue/core/installation)
- [JavaScript Quickstart](https://docs.reown.com/appkit/javascript/core/installation)
- [Dashboard (get projectId)](https://dashboard.reown.com/)
- [Discord](https://discord.gg/reown)

## Supported Networks

Import networks from `@reown/appkit/networks`:

```typescript
import { mainnet, arbitrum, optimism, polygon, solana } from '@reown/appkit/networks'
```


---

## Important Reminders

1. **Call `createAppKit()` outside component render cycles** - It should be called at module level, not inside components
2. **Use `'use client'` directive** in Next.js for components using hooks or AppKit initialization
3. **Enable `ssr: true`** in WagmiAdapter for Next.js projects
4. **Await `headers()` call** in Next.js App Router layouts
5. **Import networks from `@reown/appkit/networks`** - not from wagmi or viem
6. **Use the typed network array pattern**: `as [AppKitNetwork, ...AppKitNetwork[]]`
7. **Never hardcode production projectIds** - always use environment variables
8. **All Reown packages should be in the same version** - use the same version for all Reown packages
