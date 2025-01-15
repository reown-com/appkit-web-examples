import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitProvider, useAppKitAccount } from '@reown/appkit/react'
import type { BitcoinConnector } from '@reown/appkit-adapter-bitcoin'
import { networks } from '../config'
import { createPSBT, getBalance } from '../utils/BitcoinUtil';

interface ActionButtonListProps {
  sendSignPSBT: (hash: string ) => void;
  sendSignMsg: (hash: string) => void;
  sendSendTx: (hash: string) => void;
  sendBalance: (balance: string) => void;
  sendPublicKey: (publicKey: string) => void;
}

export const ActionButtonList = ({ sendSignPSBT, sendSignMsg, sendSendTx, sendBalance, sendPublicKey }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork, caipNetwork } = useAppKitNetwork();
    const { allAccounts, isConnected, address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<BitcoinConnector>('bip122')

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    // function to sing a msg 
    const handleSignMsg = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected')

      // raise the modal to sign the message
      const signature = await walletProvider.signMessage({
        address,
        message: "Hello Reown AppKit!"
      });

      sendSignMsg(signature); 
    }

    // function to send a tx
    const handleSendTx = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected')
        const recipientAddress = address;

      const signature = await walletProvider.sendTransfer({
        recipient: recipientAddress,
        amount: "1000"
      })

      sendSendTx(signature);
    }

    // function to sign a PSBT
    const handleSignPSBT = async () => {
      if (!walletProvider || !address || !caipNetwork) throw Error('user is disconnected');
      const amount = 10000;
      const recipientAddress = address;

      const params = await createPSBT(caipNetwork, amount, address, recipientAddress);
      
      params.broadcast = false // change to true to broadcast the tx

      const signature = await walletProvider.signPSBT(params)
      sendSignPSBT(signature.psbt);
    }

    const handleGetBalance = async () => {
      if (!walletProvider || !address || !caipNetwork) throw Error('user is disconnected');
        
      const balance = await getBalance(caipNetwork, address);
      sendBalance(balance.toString()  );
    }

    const handleGetPublicKey = async () => {
      if (!walletProvider || !address || !caipNetwork) throw Error('user is disconnected');
      
      const bip122Account = allAccounts?.find(a => a.address === address)
      let publicKey = bip122Account?.publicKey || ""

      sendPublicKey(publicKey)
    }

  return (
    <>
      {isConnected ? (
        <div >
            <button onClick={() => open()}>Open</button>
            <button onClick={handleDisconnect}>Disconnect</button>
            <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
            <button onClick={handleSignMsg}>Sign msg</button>
            <button onClick={handleSignPSBT}>Sign PSBT</button>
            <button onClick={handleSendTx}>Send tx</button>
            <button onClick={handleGetBalance}>Get Balance</button>
            <button onClick={handleGetPublicKey}>Get Public Key</button>
        </div>
      ) : null}
    </>
  )
}
