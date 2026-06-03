# Reown AppKit Example using Tron (Svelte + Vite)

This is a [Svelte](https://svelte.dev) + [Vite](https://vite.dev) project using the
framework-agnostic [Reown AppKit](https://docs.reown.com/appkit/overview) core API with the
Tron adapter.

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## How it works

Svelte has no dedicated AppKit hooks package, so this example uses the vanilla
`createAppKit` from `@reown/appkit` and bridges its `subscribe*` methods into Svelte
[stores](src/lib/store.js). Components then read that reactive state with the `$store` syntax.

- `src/config/appKit.js` — creates AppKit with the `TronAdapter` and `TronLinkAdapter`
- `src/lib/store.js` — forwards AppKit subscriptions into Svelte writable stores
- `src/lib/ActionButtonList.svelte` — open modal, disconnect, switch network, sign message, get balance
- `src/lib/InfoList.svelte` — displays account, network, theme, state and wallet info

The `<appkit-button />` web component renders the connect button.

## Resources

- [Reown — Docs](https://docs.reown.com)
- [Svelte — Docs](https://svelte.dev/docs)
- [Vite — Docs](https://vite.dev)
