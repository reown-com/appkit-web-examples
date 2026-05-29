# Reown AppKit Vue + SIWX Repro (Wagmi + Tron)

Minimal Vue 3 + Vite reproduction for two related SIWX issues reported against
AppKit `1.8.20` in a multi-adapter (Wagmi EVM + Tron) setup with
`siwx.getRequired = () => true`.

## Setup

1. Go to the [Reown Dashboard](https://dashboard.reown.com) and create a project.
2. Copy the `Project ID`.
3. Create a `.env` file with `VITE_PROJECT_ID=<your-id>` (or use the bundled
   localhost-only public id — included as a fallback in `src/config/index.ts`).
4. `pnpm install`
5. `pnpm dev`

## What this app configures

- Adapters: `WagmiAdapter` (mainnet, optimism, arbitrum, base, polygon, bsc,
  avalanche) + `TronAdapter` (tronMainnet, tronShastaTestnet) in a single
  `createAppKit`.
- `siwx`: `ReownAuthentication` (cloud-backed verifier) with `getRequired`
  overridden to always return `true`.

## Issue 1 — Multi-namespace request blocks the modal

Steps to reproduce:

1. Open the modal via `<appkit-button />`.
2. Open the wallet selection list.
3. Choose **MetaMask** (WalletConnect pairing).
4. Start the authorization flow.

**Actual result**

Authorization fails with the following console error:

```
Multi-namespace requests are not supported. Please request single namespace only.
```

After the error, every wallet except Trust Wallet becomes unavailable in the
list. Refreshing the page does not recover the state.

## Issue 2 — Abandonment paths leave a "connected without SIWX" zombie state

With `siwx.getRequired = () => true`, AppKit correctly disconnects when the user
clicks **Cancel** in the SIWX view. Several other abandonment paths instead
leave AppKit in a state where `connection_status: 'connected'` is stored in
`localStorage` with no matching `siwe_session`, so the next modal open renders
wallet buttons but clicks are no-ops.

Paths that reproduce the zombie state:

- Reject the signature in the wallet, dismiss the snackbar, then dismiss the
  modal.
- Dismiss the modal via swipe-down, click-outside, or Escape while on the SIWX
  sign-message view.
- Close the wallet popup with the mobile system back-button before
  `signMessage` resolves.

Console is silent for these (state-level, not exception-level). The wallet-
reject path additionally prints an `Error signing message` snackbar from SIWX.

## Question for the AppKit team

What is the recommended way to handle these abandonment paths for auth-only
flows where a connection without a completed SIWX session is meaningless? Is
there a built-in hook or option to force-disconnect on SIWX abandonment that
this repro is missing?

## Versions

All Reown packages pinned to `1.8.20`:

- `@reown/appkit`
- `@reown/appkit-adapter-wagmi`
- `@reown/appkit-adapter-tron`
- `@reown/appkit-siwx`

Framework: Vue 3 with `@reown/appkit/vue` + `@wagmi/vue`.
