<img src="https://github.com/user-attachments/assets/befd1901-8387-4a4c-8fbc-282dd9802889" height="100" alt="Reown">

# Web AppKit Examples


This repository provides examples of how to integrate and use **AppKit** in various frameworks, including **Javascript**,**Next.js**, **React**, and **Vue**. These examples are designed to demonstrate best practices and simplify the integration process.

## 🔧 About Reown AppKit

**Reown AppKit** is a comprehensive, open-source SDK designed to streamline the development of modern Web3 applications. It offers a suite of modular tools that simplify user onboarding, authentication, transactions, and engagement across multiple blockchain networks.

### 🚀 Key Features

- **Universal Authentication**  
  Support for email, social logins, and one-click authentication using SIWX, enabling seamless user access across EVM, Solana, and Bitcoin networks.  
  [Read more →](https://docs.reown.com/appkit/features/authentication)

- **Smart Accounts**  
  Enhance user security and convenience with multi-signature authorization and automated transaction workflows.  
  [Read more →](https://docs.reown.com/appkit/features/smart-accounts)

- **Smart Sessions**  
  Enable dApps to perform specific blockchain actions on behalf of users for a defined period, eliminating the need for repeated approvals.  
  [Read more →](https://docs.reown.com/appkit/features/smart-sessions)

- **On-Ramp & Swaps**  
  Let users buy crypto and swap tokens directly within your app.  
  [Read more →](https://docs.reown.com/appkit/features/onramp)

- **Notifications**  
  Deliver important updates directly to users’ wallets or in-app using Web3-native notifications.  
  [Read more →](https://docs.reown.com/appkit/next/notifications/overview)

- **Multi-Chain Support**  
  Works seamlessly with EVM chains, Solana, and Bitcoin.  
  [Read more →](https://docs.reown.com/appkit/overview)

- **Customizable UI**  
  Themeable components with support for light/dark modes and brand styling.  
  [Read more →](https://docs.reown.com/appkit/overview)

- **Extensive Wallet Compatibility**  
  Connects with over 600 wallets including MetaMask, Coinbase Wallet, Trust Wallet, and more.  
  [Read more →](https://docs.reown.com/appkit/overview)

Reown AppKit is framework-agnostic and supports React, Vue, Next.js, React Native, Flutter, Android, iOS, and Unity — giving developers the flexibility to build seamless and secure Web3 experiences across platforms.

📚 Explore the full documentation: [docs.reown.com/appkit](https://docs.reown.com/appkit/overview)


## Examples Included

Each framework has examples for the implementation with wagmi, ethers, solana, bitcoin and multichain (wagmi & solana)

| Framework | Integration   | Live Demo                                                                                     | Fork on Stackblitz                                                                                              |
|-----------|---------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Javascript** | ethers        | [Demo](https://appkit-web-examples-javascript-ethers.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/javascript/javascript-ethers/)                |
|           | wagmi         | [Demo](https://appkit-web-examples-javascript-wagmi.reown.com/)                                    | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/javascript/javascript-wagmi/)                 |
|           | Solana        | [Demo](https://appkit-web-examples-javascript-solana.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/javascript/javascript-solana/)                |
|           | Bitcoin       | [Demo](https://appkit-web-examples-javascript-bitcoin.reown.com/)                                  | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/javascript/javascript-bitcoin/)              |
| **Next.js** | ethers        | [Demo](https://appkit-web-examples-next-ethers.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/nextjs/next-ethers-app-router/)                |
|           | wagmi         | [Demo](https://appkit-web-examples-next-wagmi.reown.com/)                                    | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/nextjs/next-wagmi-app-router/)                 |
|           | Solana        | [Demo](https://appkit-web-examples-next-solana.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/nextjs/next-solana-app-router/)                |
|           | Bitcoin       | [Demo](https://appkit-web-examples-next-bitcoin.reown.com/)                                  | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/nextjs/next-bitcoin-app-router/)              |
|           | Multichain    | [Demo](https://appkit-web-examples-next-multichain.reown.com/)                               | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/nextjs/next-multichain-app-router/)           |
| **React**  | ethers        | [Demo](https://appkit-web-examples-react-ethers.reown.com/)                                  | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-ethers/)              |
|           | wagmi         | [Demo](https://appkit-web-examples-react-wagmi.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-wagmi/)               |
|           | Solana        | [Demo](https://appkit-web-examples-react-solana.reown.com/)                                  | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-solana/)              |
|           | Bitcoin       | [Demo](https://appkit-web-examples-react-bitcoin.reown.com/)                                 | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-bitcoin/)             |
|           | Multichain    | [Demo](https://appkit-web-examples-react-multichain.reown.com/)                              | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-multichain/)          |
|           | AppKit Pay    | [Demo](https://appkit-web-examples-pay.reown.com/)                                           | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/react/react-wagmi-appkit-pay/)          |
| **Vue**    | ethers        | [Demo](https://appkit-web-examples-vue-ethers.reown.com/)                                    | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/vue/vue-ethers/)                  |
|           | wagmi         | [Demo](https://appkit-web-examples-vue-wagmi.reown.com/)                                     | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/vue/vue-wagmi/)                   |
|           | Solana        | [Demo](https://appkit-web-examples-vue-solana.reown.com/)                                    | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/vue/vue-solana/)                  |
|           | Bitcoin       | [Demo](https://appkit-web-examples-vue-bitcoin.reown.com/)                                   | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/vue/vue-bitcoin/)                 |
|           | Multichain    | [Demo](https://appkit-web-examples-vue-multichain.reown.com/)                                | [Fork](https://stackblitz.com/github/reown-com/appkit-web-examples/tree/main/vue/vue-multichain/)              |


---

## Structure

```plaintext
.
├── javascript/   # Web AppKit with Javascript
├──────── javascript-bitcoin    
├──────── javascript-core    # AppKit Core
├──────── javascript-ethers
├──────── javascript-multichain    # Wagmi + Solana
├──────── javascript-wagmi
├──────── javascript-solana
├── nextjs/   # Web AppKit with NextJS
├──────── next-bitcoin-app-router
├──────── next-core-app-router    # AppKit Core
├──────── next-siwe-next-auth
├──────── next-siwx-multichain-supabase-storage
├──────── next-siwx-multichain
├──────── next-wagmi-app-router
├──────── next-ethers-app-router
├──────── next-solana-app-router
├──────── next-multichain-app-router    # Wagmi + Solana
├── react/    # Web AppKit with React
├──────── react-bitcoin
├──────── react-core    # AppKit Core
├──────── react-wagmi
├──────── react-ethers
├──────── react-ethers5
├──────── react-multichain    # Wagmi + Solana
├──────── react-solana
├──────── react-siwe-server-example
├──────── react-wagmi-appkit-pay
├── vue/      # Web AppKit with Vue
├──────── vue-bitcoin    
├──────── vue-core    # AppKit Core
├──────── vue-ethers
├──────── vue-multichain (wagmi+solana)
├──────── vue-solana
└──────── vue-wagmi
```

## Reference

- [AppKit Docs](https://docs.reown.com/appkit/overview)
- [React AppKit Quickstart](https://docs.reown.com/appkit/react/core/installation)
- [Next.js AppKit Quickstart](https://docs.reown.com/appkit/next/core/installation)
- [Vue AppKit Quickstart](https://docs.reown.com/appkit/vue/core/installation)
- [Javascript AppKit Quickstart](https://docs.reown.com/appkit/javascript/core/installation)
- [Discord for Questions](https://discord.gg/reown)
- [Dashboard to create a projectId to use AppKit](https://cloud.reown.com/)
