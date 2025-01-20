# Web AppKit Examples

This repository provides examples of how to integrate and use **AppKit** in various frameworks, including **Next.js**, **React**, and **Vue**. These examples are designed to demonstrate best practices and simplify the integration process.

## Examples Included

Each framework has examples for the implementation with wagmi, ethers, solana, bitcoin and multichain (wagmi & solana)

| Framework | Integration   | Live Demo                                                                                     | Fork on Stackblitz                                                                                              |
|-----------|---------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
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
├── nextjs/   # Web AppKit with NextJS
├──────── next-bitcoin-app-router
├──────── next-wagmi-app-router
├──────── next-ethers-app-router
├──────── next-solana-app-router
├──────── next-multichain-app-router (wagmi+solana)
├── react/    # Web AppKit with React
├──────── react-bitcoin
├──────── react-wagmi
├──────── react-ethers
├──────── react-ethers5
├──────── react-multichain (wagmi+solana)
├──────── react-solana
├── vue/      # Web AppKit with Vue
├──────── vue-bitcoin
├──────── vue-ethers
├──────── vue-multichain (wagmi+solana)
├──────── vue-solana
└──────── vue-wagmi
