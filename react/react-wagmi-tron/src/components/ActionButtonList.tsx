import { useDisconnect, useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import type { TronConnector } from '@reown/appkit-adapter-tron'
import { useSignMessage } from 'wagmi'
import type { Address } from 'viem'

const MESSAGE = 'Hello Reown AppKit!'

interface ActionButtonListProps {
  sendEvmSignedMsg: (signedMsg: string) => void;
  sendTronSignedMsg: (signedMsg: string) => void;
}

export const ActionButtonList = ({ sendEvmSignedMsg, sendTronSignedMsg }: ActionButtonListProps) => {
  const { disconnect } = useDisconnect(); // AppKit hook to disconnect
  const { open } = useAppKit(); // AppKit hook to open the modal

  // One account state per namespace, so both chains can stay connected at the same time
  const eip155Account = useAppKitAccount({ namespace: 'eip155' })
  const tronAccount = useAppKitAccount({ namespace: 'tron' })

  const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message on EVM
  const { walletProvider: tronProvider } = useAppKitProvider<TronConnector>('tron') // Tron connector to sign a message

  // sign a message with the connected EVM account
  const handleSignEvmMsg = async () => {
    if (!eip155Account.address) throw Error('EVM account is disconnected')

    const sig = await signMessageAsync({
      message: MESSAGE,
      account: eip155Account.address as Address
    })

    sendEvmSignedMsg(sig);
  }

  // sign a message with the connected Tron account
  const handleSignTronMsg = async () => {
    if (!tronProvider || !tronAccount.address) throw Error('Tron account is disconnected')

    const sig = await tronProvider.signMessage({
      message: MESSAGE,
      from: tronAccount.address
    })

    sendTronSignedMsg(sig);
  }

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <div>
      <button onClick={() => open({ view: 'Connect', namespace: 'eip155' })}>Connect EVM</button>
      <button onClick={() => open({ view: 'Connect', namespace: 'tron' })}>Connect Tron</button>
      <button onClick={handleSignEvmMsg} disabled={!eip155Account.isConnected}>Sign msg (EVM)</button>
      <button onClick={handleSignTronMsg} disabled={!tronAccount.isConnected}>Sign msg (Tron)</button>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  )
}
