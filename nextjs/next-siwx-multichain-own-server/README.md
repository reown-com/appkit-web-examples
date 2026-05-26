# next-siwx-multichain-own-server

SIWX with **your own Next.js server** as the source of truth for nonces,
signature verification, and session storage — across **EVM**, **Bitcoin**,
and **Tron**.

Unlike `DefaultSIWX`, no client-side verifiers run. The wallet signs, the
signature ships to `/api/siwx/verify`, and the server is the only thing
that ever checks it.

## How it works

```
 ┌────────┐  1. GET /api/siwx/nonce            ┌─────────────┐
 │ Wallet │ ───────────────────────────────►   │ Next.js API │
 │ + dApp │  2. wallet signs SIWX message      │   routes    │
 │        │  3. POST /api/siwx/verify          │             │
 │        │      { data, message, signature }  │  - verify   │
 │        │ ◄──────────────────────────────── │  - issue JWT │
 └────────┘  4. httpOnly cookie set            └─────────────┘
```

The client uses a custom `ServerSIWX` class (`src/siwx/ServerSIWX.ts`) that
implements the `SIWXConfig` **interface** — not the abstract class — so
nothing in `@reown/appkit-siwx` runs verifiers locally.

Per-chain verification on the server:

| Namespace | Library                  | Used in                          |
| --------- | ------------------------ | -------------------------------- |
| `eip155`  | `viem.verifyMessage`     | `src/siwx/verifiers/eip155.ts`   |
| `bip122`  | `bip322-js`              | `src/siwx/verifiers/bip122.ts`   |
| `tron`    | `tronweb` `verifyMessageV2` | `src/siwx/verifiers/tron.ts` |

Session storage is a stateless JWT in an `httpOnly` cookie (`jose`).
Swap `src/lib/server/session.ts` for a DB-backed store if you need
revocation or per-session metadata.

## Setup

```bash
cp .env.local.example .env.local
# edit .env.local — set SIWX_SECRET to a long random string
pnpm install
pnpm dev
```

Open <http://localhost:3000>, connect a wallet, and sign the SIWX message.
The "Server says" panel reads back what `/api/siwx/sessions` returns.

## Files

```
src/
├── app/
│   ├── api/siwx/
│   │   ├── nonce/route.ts     # HMAC-signed stateless nonce
│   │   ├── verify/route.ts    # signature verify + JWT issuance
│   │   ├── sessions/route.ts  # current session for active wallet
│   │   └── revoke/route.ts    # clears the cookie
│   ├── layout.tsx
│   └── page.tsx
├── config/index.ts            # WagmiAdapter + BitcoinAdapter + TronAdapter
├── context/index.tsx          # createAppKit({ siwx: new ServerSIWX() })
├── siwx/
│   ├── ServerSIWX.ts          # implements SIWXConfig interface
│   └── verifiers/             # server-only signature verification
│       ├── eip155.ts
│       ├── bip122.ts
│       ├── tron.ts
│       └── index.ts
└── lib/server/
    ├── env.ts
    ├── nonce.ts               # HMAC-signed stateless nonces
    └── session.ts             # jose JWT + httpOnly cookie
```

## Notes

- `SIWX_SECRET` is used both for nonce HMACs and for signing the session JWT.
  Use a long, random, high-entropy value and rotate as needed.
- Tron signs with the `"TRON Signed Message:"` prefix via `signMessageV2`;
  recovery uses the matching `verifyMessageV2`.
- This example keeps a single active session at a time (cookie-based). If you
  need simultaneous sessions across chains, replace the JWT store with a real
  database keyed by `(chainId, address)`.

## Resources

- [AppKit SIWX docs](https://docs.reown.com/appkit/authentication/siwx/default)
- [Reown Dashboard](https://dashboard.reown.com)
