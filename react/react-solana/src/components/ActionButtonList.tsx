import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider   } from '@reown/appkit/react'
import { networks } from '../config'
import type { Provider } from '@reown/appkit-adapter-solana/react'
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react'
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { useState } from 'react';

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
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);


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

    const openModalWithCheckbox = () => {
      setIsModalOpen(true);
      setIsCheckboxChecked(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setIsCheckboxChecked(false);
    };

    const handleModalButtonClick = () => {
      open();
      closeModal();
    };


    return (
      <>
        
          <div >
            <div >
              <button onClick={() => open()}>Open</button>
              <button onClick={openModalWithCheckbox}>Open Modal with checkbox</button>
              {isConnected ? (
                <>
              <button onClick={handleDisconnect}>Disconnect</button>
              <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
              <button onClick={handleSignMsg}>Sign msg</button>
              <button onClick={handleSendTx}>Send tx</button>
              <button onClick={handleGetBalance}>Get Balance</button>  
              </>
              ):null}
            </div>
          </div>
        

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              minWidth: '300px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ marginTop: 0, color: '#333' }}>Modal with Checkbox</h2>
              
              <div style={{ margin: '20px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={isCheckboxChecked}
                    onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                    style={{ marginRight: '10px', cursor: 'pointer', width: '18px', height: '18px' }}
                  />
                  <span style={{ color: '#333' }}>I agree to the terms and conditions</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={closeModal}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleModalButtonClick}
                  disabled={!isCheckboxChecked}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: isCheckboxChecked ? '#007bff' : '#cccccc',
                    color: 'white',
                    cursor: isCheckboxChecked ? 'pointer' : 'not-allowed',
                    opacity: isCheckboxChecked ? 1 : 0.6
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }