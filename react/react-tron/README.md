# Reown AppKit Example using TRON Adapter (Vite + React)

This is a [Vite](https://vitejs.dev) project together with React.

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `VITE_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## Actions

| Button | What it does |
|---|---|
| `Switch` | Toggle between TRON mainnet and Shasta testnet |
| `Sign msg` | `walletProvider.signMessage(...)` |
| `Send tx` | Native TRX transfer via `walletProvider.sendTransaction(...)` |
| `Send USDT` | TRC-20 `transfer(address,uint256)` signed with `tron_signTransaction` |
| `Get Balance` | `useAppKitBalance().fetchBalance()` |

### Send tx

Sends 0.001 TRX to `RECIPIENT_ADDRESS` in `src/config/index.tsx`, which defaults to the TRON black
hole address — replace it with an address you control if you want the TRX back. TRON rejects native
transfers where the sender and the recipient are the same account, so this action needs a real
counterparty.

### Send USDT

AppKit's typed `sendTransaction` only moves native TRX, so a TRC-20 transfer takes three steps:

1. **Build** the unsigned `TriggerSmartContract` transaction with
   `tronWeb.transactionBuilder.triggerSmartContract(...)`.
2. **Sign** it with the wallet. Over WalletConnect this is the `tron_signTransaction` RPC method;
   the injected TronLink connector doesn't implement it and exposes `tron_sendTransaction` instead,
   which — despite the name — signs without broadcasting. `signTransaction()` in
   `src/components/ActionButtonList.tsx` picks the right one based on the connector type.
3. **Broadcast** it with `tronWeb.trx.sendRawTransaction(signedTx)`.

This **broadcasts a real transaction**. It transfers 0.01 USDT to the connected account itself, so no
USDT actually leaves the wallet, but the account still pays the energy/bandwidth fee (roughly 13–27
TRX if you have no staked energy). USDT has 6 decimals, so 0.01 USDT is `10_000` in the token's
smallest unit.

The USDT contract address per network is in `src/config/index.tsx`:

| Network | USDT contract |
|---|---|
| TRON mainnet | `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t` |
| Shasta testnet | `TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs` |

To try it on Shasta, get test funds from the `TronFAQBot` faucet in the [TRON Discord](https://discord.gg/tron):
`!shasta` for TRX and `!shasta_usdt <your address>` for USDT.

## Resources

- [Reown — Docs](https://docs.reown.com)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
