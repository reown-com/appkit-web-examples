import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider   } from '@reown/appkit/react'
import { networks } from '../config'
import { useSolanaRpc } from '../hooks/useSolanaRpc'
import type { Provider } from '@reown/appkit-adapter-solana/react'
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

interface ActionButtonListProps {
  sendHash: (hash: string ) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();
    const { isConnected, address } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider<Provider>('solana')
    const rpc = useSolanaRpc();


    // function to send a tx
    const handleSendTx = async () => {
      if (!address || !rpc || !walletProvider) throw Error('user is disconnected');

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

      const signedTransaction = await walletProvider.signTransaction(compileTransaction(transactionMessage));
      const sig = await rpc
        .sendTransaction(getBase64EncodedWireTransaction(signedTransaction), { encoding: 'base64' })
        .send();

      sendHash(sig);
    }

    // function to sing a msg 
    const handleSignMsg = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected')
      
      const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
      const sig = await walletProvider.signMessage(encodedMessage);

      const signatureHex = Buffer.from(sig).toString("hex");
      sendSignMsg(signatureHex);
    }

    // function to get the balance
    const handleGetBalance = async () => {
      if (!address || !rpc) throw Error('user is disconnected');
      
      const { value: balance } = await rpc.getBalance(toAddress(address)).send();
      sendBalance(`${Number(balance) / LAMPORTS_PER_SOL} SOL`);
    }

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };
    return (
      <>
        {isConnected ? (
          <div >
            <div >
              <button onClick={() => open()}>Open</button>
              <button onClick={handleDisconnect}>Disconnect</button>
              <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
              <button onClick={handleSignMsg}>Sign msg</button>
              <button onClick={handleSendTx}>Send tx</button>
              <button onClick={handleGetBalance}>Get Balance</button>  
            </div>
          </div>
        ) : null}
      </>
    );
  }