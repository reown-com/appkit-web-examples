import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitBalance
} from '@reown/appkit/react'
import type { TronConnector } from '@reown/appkit-adapter-tron'
import { networks } from '../config'

interface ActionButtonListProps {
  sendHash: (hash: string) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork, caipNetwork } = useAppKitNetwork();
    const { isConnected, address } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider<TronConnector>('tron')
    const { fetchBalance } = useAppKitBalance()

    // function to send a tx (self-transfer of 1000 SUN = 0.001 TRX)
    const handleSendTx = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected');

      const hash = await walletProvider.sendTransaction({
        from: address,
        to: address,
        value: '1000'
      })

      sendHash(hash);
    }

    // function to sign a msg
    const handleSignMsg = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected')

      const sig = await walletProvider.signMessage({
        message: 'Hello Reown AppKit!',
        from: address
      })

      sendSignMsg(sig);
    }

    // function to get the balance
    const handleGetBalance = async () => {
      const result = await fetchBalance()
      if (result.isSuccess && result.data) {
        sendBalance(`${result.data.balance} ${result.data.symbol}`)
      } else {
        sendBalance('- TRX');
      }
    }

    // toggle between TRON mainnet and Shasta testnet
    const handleSwitchNetwork = () => {
      const next = caipNetwork?.id === networks[0].id ? networks[1] : networks[0]
      switchNetwork(next)
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
              <button onClick={handleSwitchNetwork}>Switch</button>
              <button onClick={handleSignMsg}>Sign msg</button>
              <button onClick={handleSendTx}>Send tx</button>
              <button onClick={handleGetBalance}>Get Balance</button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
