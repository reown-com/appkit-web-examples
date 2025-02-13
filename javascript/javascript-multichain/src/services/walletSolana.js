import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

  export const signMessage = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
    const sig = await provider.signMessage(encodedMessage);

    return Buffer.from(sig).toString("hex");
  }

  export const sendTx = async (provider, connection, address) => {
      if (!address || !connection) throw Error('user is disconnected');

      const wallet = new PublicKey(address);
      if (!wallet) throw Error('wallet provider is not available');

      const latestBlockhash = await connection.getLatestBlockhash();

      const transaction= new Transaction({
        feePayer: wallet,
        recentBlockhash: latestBlockhash?.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: wallet,
          toPubkey: new PublicKey(address), // destination address
          lamports: 1000,
        })
      );

      return await provider.sendTransaction(transaction, connection)
  }

  export const getBalance = async (provider, connection, address) => {
    if (!address || !connection) throw Error('user is disconnected');
      /* https://rpc.walletconnect.org/v1/?chainId=solana%3A5ey // online
      https://rpc.walletconnect.org/v1/?chainId=solana%3AEtWTRAB // dev */
      const wallet = new PublicKey(address);
      const balance = await connection?.getBalance(wallet);
      if (balance !== undefined) {
        return `${balance / LAMPORTS_PER_SOL}`;
      } else {
        return '-';
      }
  }
