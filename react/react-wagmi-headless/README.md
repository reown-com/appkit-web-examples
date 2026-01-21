# Reown AppKit Headless Example (Vite + React + Wagmi)

This is a [Vite](https://vitejs.dev) project demonstrating AppKit's Headless mode, which allows you to build a fully customizable wallet connection UI.

## What is Headless Mode?

AppKit Headless allows developers to build a fully customizable "Connect" experience powered by AppKit's existing features without using the AppKit modal. Headless exposes:

- **Wallet Discovery**: Access to injected wallets and WalletConnect wallets
- **WalletConnect QR Codes**: Render QR codes for mobile wallet connections
- **Social Provider Flows**: Support for social login providers

All of this is available via simple hooks and utility functions.

## Key Features Demonstrated

- Custom wallet list UI using `useAppKitWallets` hook
- WalletConnect QR code display for mobile wallets
- Namespace (chain) selection for multi-chain wallets
- Wallet search functionality with pagination
- Full control over the connection UI/UX

## Key Hook: `useAppKitWallets`

```typescript
const {
  wallets,           // Combined list of injected + WalletConnect wallets
  wcWallets,         // WalletConnect wallets only
  isFetchingWallets, // Loading state for wallet list
  isFetchingWcUri,   // Loading state for QR code generation
  isInitialized,     // AppKit initialization state
  wcUri,             // WalletConnect URI for QR code
  connectingWallet,  // Currently connecting wallet
  page,              // Current page of WC wallets
  count,             // Total available WC wallets
  fetchWallets,      // Function to fetch/search wallets
  connect,           // Function to connect to a wallet
  resetWcUri,        // Function to reset WC URI state
} = useAppKitWallets()
```

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## Configuration

Enable headless mode in your AppKit configuration:

```typescript
createAppKit({
  adapters: [wagmiAdapter],
  // ... other config
  features: {
    headless: true // Enable headless mode
  }
})
```

## Project Structure

```
src/
├── config/
│   └── index.tsx           # AppKit & Wagmi configuration
├── components/
│   ├── ConnectView.tsx     # Main connect UI with wallet list
│   ├── AllWalletsView.tsx  # Search & browse all WalletConnect wallets
│   ├── WalletListItem.tsx  # Individual wallet button component
│   ├── WalletConnectQRDialog.tsx  # QR code dialog for WC connections
│   ├── NamespaceDialog.tsx # Chain selection for multi-chain wallets
│   ├── ActionButtonList.tsx # Actions after connecting
│   └── InfoList.tsx        # Display wallet/account info
├── hooks/
│   └── useDebounce.ts      # Debounce hook for search
├── App.tsx                 # Main app component
├── App.css                 # Styles
└── main.tsx                # Entry point
```

## Resources

- [Headless Documentation](https://docs.reown.com/appkit/react/early-access/headless)
- [Reown — Docs](https://docs.reown.com)
- [AppKit React Installation](https://docs.reown.com/appkit/react/core/installation)
- [Vite — Docs](https://vitejs.dev/guide/)

## Note

Headless mode is currently in early-access. Contact Reown to get access if you don't have it yet.
