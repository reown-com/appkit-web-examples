import { UniversalConnector } from "@reown/appkit-universal-connector";

interface ActionButtonListProps {
  universalConnector: UniversalConnector | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({ universalConnector, session, setSession}: ActionButtonListProps) => {
 
    // function to sing a msg 
    const handleSignTONMsg = async () => {
      if (!universalConnector) {
        return
      }

      const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = session?.namespaces['ton']?.accounts[0]
        if (!account) {
          throw new Error('No account found')
        }

        const result = await universalConnector.request(
          {
            method: 'ton_signData',
            params: {
              type: "text",
              text: message,
              from: account
            }
          },
          'ton:-239'
        )
        // eslint-disable-next-line no-console
        console.log('>> Sui Sign Message result', result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('>> Sui Sign Message error', error)
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
          <button onClick={handleSignTONMsg}>Sign TON msg</button>
          <div>
            <p>TON Account: {session.namespaces?.ton?.accounts?.[0]}</p>
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
