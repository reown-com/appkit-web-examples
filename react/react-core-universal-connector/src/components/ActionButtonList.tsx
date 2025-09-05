import { UniversalConnector } from "@reown/appkit-universal-connector";

interface ActionButtonListProps {
  universalConnector: UniversalConnector | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({ universalConnector, session, setSession}: ActionButtonListProps) => {
 
    // function to sing a msg 
    const handleSignSUIMsg = async () => {
      if (!universalConnector) {
        return
      }

      const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = session?.namespaces['sui']?.accounts[0]
        if (!account) {
          throw new Error('No account found')
        }

        const result = await universalConnector.request(
          {
            method: 'sui_signPersonalMessage',
            params: [message]
          },
          'sui:mainnet'
        )
        // eslint-disable-next-line no-console
        console.log('>> Sui Sign Message result', result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('>> Sui Sign Message error', error)
      }
    }
    
    const handleSignStacksMsg = async () => {
      if (!universalConnector) {
        return
      }

      const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = session?.namespaces['stacks']?.accounts[0].split(':')[2]
        if (!account) {
          throw new Error('No account found')
        }

        const result = await universalConnector.request(
          {
            method: 'stx_signMessage',
            params: {
              message,
              address: account
            }
          },
          'stacks:1'
        )
        // eslint-disable-next-line no-console
        console.log('>> Stacks Sign Message result', result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('>> Stacks Sign Message error', error)
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
          <button onClick={handleSignSUIMsg}>Sign SUI msg</button>
          <button onClick={handleSignStacksMsg}>Sign Stacks msg</button>
          <div>
            <p>Sui Account: {session.namespaces?.sui?.accounts?.[0]}</p>
            <p>Stacks Account: {session.namespaces?.stacks?.accounts?.[0]}</p>
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
