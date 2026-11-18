import {
  address as toAddress,
  appendTransactionMessageInstruction,
  compileTransaction,
  createNoopSigner,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  lamports,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";

const LAMPORTS_PER_SOL = 1_000_000_000;

  export const signMessage = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
    const sig = await provider.signMessage(encodedMessage);

    return Buffer.from(sig).toString("hex");
  }

  export const sendTx = async (provider, rpc, address) => {
      if (!address || !rpc) throw Error('user is disconnected');
      if (!provider) throw Error('wallet provider is not available');

      // the wallet signs the tx, so we only need a placeholder signer for its address
      const wallet = createNoopSigner(toAddress(address));

      const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

      const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(wallet, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstruction(
          getTransferSolInstruction({
            source: wallet,
            destination: wallet.address, // destination address
            amount: lamports(1000n),
          }),
          tx
        )
      );

      const signedTransaction = await provider.signTransaction(compileTransaction(transactionMessage));

      return await rpc
        .sendTransaction(getBase64EncodedWireTransaction(signedTransaction), { encoding: 'base64' })
        .send();
  }

  export const getBalance = async (provider, rpc, address) => {
    if (!address || !rpc) throw Error('user is disconnected');
      /* https://rpc.walletconnect.org/v1/?chainId=solana%3A5ey // online
      https://rpc.walletconnect.org/v1/?chainId=solana%3AEtWTRAB // dev */
      const { value: balance } = await rpc.getBalance(toAddress(address)).send();
      return `${Number(balance) / LAMPORTS_PER_SOL}`;
  }
