# Reown AppKit Multichain Example using Bitcoin, EVM (wagmi) and Tron (Vite + React)

This is a [Vite](https://vitejs.dev) project together with React demonstrating a multichain AppKit setup that combines three adapters:

- **EVM** via `@reown/appkit-adapter-wagmi` (mainnet, arbitrum)
- **Bitcoin** via `@reown/appkit-adapter-bitcoin` (bitcoin, bitcoinTestnet)
- **Tron** via `@reown/appkit-adapter-tron` (tronMainnet, tronShastaTestnet)

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## Resources

- [Reown — Docs](https://docs.reown.com)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
