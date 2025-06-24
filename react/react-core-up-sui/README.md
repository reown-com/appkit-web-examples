# Reown AppKit Example using SUI Universal Provider (Vite + React)

This is a [Vite](https://vitejs.dev) project together with React demonstrating SUI blockchain integration with Reown's Universal Provider.

## Features

- Connect to SUI wallets using WalletConnect
- Sign personal messages on SUI
- Sign transactions on SUI
- Support for SUI Mainnet, Testnet, and Devnet

## Usage

1. Go to [Reown Cloud](https://cloud.reown.com) and create a new project.
2. Copy your `Project ID`
3. Create a `.env` file and add your `Project ID` as `VITE_PROJECT_ID=your_project_id_here`
4. Run `npm install --legacy-peer-deps` to install dependencies
5. Run `npm run dev` to start the development server

## SUI Integration

This example demonstrates how to integrate SUI blockchain with Reown's Universal Provider, supporting:
- Multiple SUI networks (Mainnet, Testnet, Devnet)
- SUI-specific signing methods
- Proper chain namespace handling

## Resources

- [Reown — Docs](https://docs.reown.com)
- [SUI — Docs](https://docs.sui.io)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
