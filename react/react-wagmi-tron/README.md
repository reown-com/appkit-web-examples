# Reown AppKit Example using EVM (wagmi) and Tron (Vite + React)

This is a [Vite](https://vitejs.dev) project together with React demonstrating a multichain AppKit setup that combines two adapters:

- **EVM** via `@reown/appkit-adapter-wagmi` (mainnet)
- **Tron** via `@reown/appkit-adapter-tron` (tronMainnet)

Both namespaces can be connected at the same time, and the example shows how to sign a message on each one:

- EVM messages are signed with wagmi's `useSignMessage`
- Tron messages are signed with the `TronConnector` returned by `useAppKitProvider('tron')`

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
