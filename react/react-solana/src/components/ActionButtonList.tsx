import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider   } from '@reown/appkit/react'
import { networks } from '../config'
import type { Provider } from '@reown/appkit-adapter-solana/react'
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react'
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

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
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>('solana')


    // function to send a tx
    const handleSendTx = async () => {
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

      const sig = await walletProvider.sendTransaction(transaction, connection)

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
      if (!address || !connection) throw Error('user is disconnected');
      
      const wallet = new PublicKey(address);
      const balance = await connection?.getBalance(wallet);
      if (balance !== undefined) {
        sendBalance(`${balance / LAMPORTS_PER_SOL} SOL`);
      } else {
        sendBalance('- SOL');
      }
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