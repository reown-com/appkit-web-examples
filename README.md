<img src="https://github.com/user-attachments/assets/befd1901-8387-4a4c-8fbc-282dd9802889" height="100" alt="Reown">

# Web AppKit Examples


This repository provides examples of how to integrate and use **AppKit** in various frameworks, including **Javascript**,**Next.js**, **React**, and **Vue**. These examples are designed to demonstrate best practices and simplify the integration process.

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
├── vue/      # Web AppKit with Vue
├──────── vue-bitcoin    
├──────── vue-core    # AppKit Core
├──────── vue-ethers
├──────── vue-multichain (wagmi+solana)
├──────── vue-solana
└──────── vue-wagmi
