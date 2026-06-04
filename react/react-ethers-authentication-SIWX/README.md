# Reown AppKit Example using Ethers + SIWX Authentication (Vite + React)

This is a [Vite](https://vitejs.dev) project together with React that demonstrates how to use
[Sign In With X (SIWX)](https://docs.reown.com/appkit/authentication/siwx/default) with the
Ethers adapter, using **ReownAuthentication** (Cloud Auth) as the SIWX provider.

## What this example shows

- Integrating [Reown AppKit](https://docs.reown.com/appkit/overview) with the
  `@reown/appkit-adapter-ethers` adapter.
- Enabling SIWX through `@reown/appkit-siwx` using the `ReownAuthentication` provider.
- Forcing authentication with `required: true`, so users must sign the SIWX message
  right after connecting their wallet before they can use the app.

```ts
import { ReownAuthentication } from '@reown/appkit-siwx'

createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  // Require users to sign in (SIWX) after connecting their wallet
  siwx: new ReownAuthentication({ required: true })
})
```

> **Note:** `ReownAuthentication` relies on Cloud Auth. Make sure SIWX / Cloud Auth is
> enabled for your project in the [Reown Dashboard](https://dashboard.reown.com).

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## Resources

- [Reown — Docs](https://docs.reown.com)
- [AppKit SIWX — Docs](https://docs.reown.com/appkit/authentication/siwx/default)
- [Reown Authentication — Docs](https://docs.reown.com/cloud/reown-authentication)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
