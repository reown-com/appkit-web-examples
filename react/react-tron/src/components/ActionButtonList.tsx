import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitBalance
} from '@reown/appkit/react'
import type { TronConnector } from '@reown/appkit-adapter-tron'
import { TronWeb, type Types } from 'tronweb'
import { networks, RECIPIENT_ADDRESS, USDT_ADDRESS, USDT_AMOUNT } from '../config'

interface ActionButtonListProps {
  sendHash: (hash: string) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
  sendUsdtHash: (hash: string) => void;
  sendError: (error: string) => void;
}

// The WalletConnect connector keeps the UniversalProvider on a public `provider` field, but it is
// not part of the TronConnector type - this is the little bit of it we need.
type WalletConnectProvider = {
  request: <T>(args: { method: string; params: unknown }, chainId: string) => Promise<T>
}

// Ask the connected wallet to sign an already built transaction.
async function signTransaction(
  walletProvider: TronConnector,
  address: string,
  transaction: Types.Transaction,
  caipNetworkId: string
) {
  // TronLink (injected) does not implement `tron_signTransaction`. Its `tron_sendTransaction` maps
  // to the wallet adapter's signTransaction, so despite the name it signs without broadcasting.
  if (walletProvider.type === 'INJECTED') {
    return walletProvider.request<Types.SignedTransaction>({
      method: 'tron_sendTransaction',
      params: { transaction }
    })
  }

  // For WalletConnect we go through the UniversalProvider directly, because
  // TronWalletConnectConnector.request() delegates to a method that does not exist in appkit 1.8.21.
  const { provider } = walletProvider as unknown as { provider: WalletConnectProvider }

  return provider.request<Types.SignedTransaction>(
    {
      method: 'tron_signTransaction',
      params: { address, transaction }
    },
    caipNetworkId
  )
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance, sendUsdtHash, sendError }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork, caipNetwork } = useAppKitNetwork();
    const { isConnected, address } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider<TronConnector>('tron')
    const { fetchBalance } = useAppKitBalance()

    // function to send a tx (1000 SUN = 0.001 TRX)
    const handleSendTx = async () => {
      if (!walletProvider || !address) throw Error('user is disconnected');

      const hash = await walletProvider.sendTransaction({
        from: address,
        to: RECIPIENT_ADDRESS,
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

    // function to transfer 0.01 USDT (TRC-20) to yourself. AppKit's typed `sendTransaction` only
    // moves native TRX, so the contract call is built with tronweb, signed by the wallet through
    // `tron_signTransaction`, and broadcast against the TRON node.
    const handleSendUsdt = async () => {
      try {
        sendError('')

        if (!walletProvider || !address || !caipNetwork) throw Error('user is disconnected')

        const contractAddress = USDT_ADDRESS[caipNetwork.id]
        if (!contractAddress) throw Error(`USDT is not available on ${caipNetwork.name}`)

        const tronWeb = new TronWeb({ fullHost: caipNetwork.rpcUrls.chainDefault.http[0] })
        tronWeb.setAddress(address)

        // build the unsigned TriggerSmartContract transaction. feeLimit is a cap, not a charge.
        const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
          contractAddress,
          'transfer(address,uint256)',
          { feeLimit: 100_000_000, callValue: 0 },
          [
            { type: 'address', value: address },
            { type: 'uint256', value: USDT_AMOUNT }
          ],
          address
        )

        const signedTx = await signTransaction(walletProvider, address, transaction, caipNetwork.caipNetworkId)

        const receipt = await tronWeb.trx.sendRawTransaction(signedTx)
        if (!receipt.result) throw Error(receipt.message ?? 'Failed to broadcast transaction')

        sendUsdtHash(signedTx.txID)
      } catch (error) {
        sendError(error instanceof Error ? error.message : String(error))
      }
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
              <button onClick={handleSendUsdt}>Send USDT</button>
              <button onClick={handleGetBalance}>Get Balance</button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
