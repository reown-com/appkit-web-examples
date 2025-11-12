import { UniversalConnector } from "@reown/appkit-universal-connector";
import base58 from 'bs58'

interface ActionButtonListProps {
  universalConnector: UniversalConnector | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({ universalConnector, session, setSession}: ActionButtonListProps) => {
 
    // function to sing a msg 
    const handleSignSolanaMsg = async () => {
      if (!universalConnector) {
        return
      }

      //const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = session?.namespaces['solana']?.accounts[0]
        if (!account) {
          throw new Error('No account found')
        }

        const encodedMessage = base58.encode(new TextEncoder().encode('Hello Appkit!'));
        const result = await universalConnector.request(
        {
          method: 'solana_signMessage',
          params: {
            message: encodedMessage,
            pubkey: account.split(':')[2]
          }
        },
          'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
        );
        console.log('>> Solana Sign Message result', result);
      } catch (error) {
        console.error('>> Solana Sign Message error', error);
      }
    }

    const handleDisconnect = async () => {
      if (!universalConnector) {
        return
      }
      await universalConnector.disconnect()
      setSession(null)
    };


    const handleConnect = async () => {
      if (!universalConnector) {
        return
      }
  
      const { session: providerSession } = await universalConnector.connect()
      setSession(providerSession)
    };


  return (
    (
    <div >
      {session ? (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
          <button onClick={handleSignSolanaMsg}>Sign Solana msg</button>
          <div>
            <p>Solana Account: {session.namespaces?.solana?.accounts?.[0]}</p>
          
          </div>
          <br/>
        </>
      ) : (
        <button onClick={handleConnect}>Open</button>
      )}
    </div>
    )
  )
}
