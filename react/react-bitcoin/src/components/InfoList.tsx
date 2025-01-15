import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useWalletInfo
     } from '@reown/appkit/react'

interface InfoListProps {
    psbt: string;
    signedMsg: string;
    txHash: string;
    balance: string;
    publicKey: string;
}

export const InfoList = ({psbt, signedMsg, txHash, balance, publicKey}: InfoListProps) => {
    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const {address, caipAddress, isConnected, status} = useAppKitAccount();
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

  return (
    < >
        {publicKey && (
        <section>
            <h2>Public Key</h2>
            <pre>
                {publicKey}<br />
            </pre>
        </section>
        )}
        {psbt && (
        <section>
            <h2>PSBT</h2>
            <pre>
                Hash: {psbt}<br />
            </pre>
        </section>
        )}
        {txHash && (
        <section>
            <h2>Sign Tx</h2>
            <pre>
                Hash: {txHash}<br />
            </pre>
        </section>
        )}
        {signedMsg && (
        <section>
            <h2>Sign MSG</h2>
            <pre>
                {signedMsg}<br />
            </pre>
        </section>
        )}
        {balance && (
        <section>
            <h2>Balance</h2>
            <pre>
                {balance}<br />
            </pre>
        </section>
        )}
        <section>
            <h2>useAppKit</h2>
            <pre>
                Address: {address}<br />
                caip Address: {caipAddress}<br />
                Connected: {isConnected.toString()}<br />
                Status: {status}<br />
            </pre>
        </section>

        <section>
            <h2>Theme</h2>
            <pre>
                Theme: {themeMode}<br />
                ThemeVariables: { JSON.stringify(themeVariables, null, 2)}<br />
            </pre>
        </section>

        <section>
            <h2>State</h2>
            <pre>
                activeChain: {state.activeChain}<br />
                loading: {state.loading.toString()}<br />
                open: {state.open.toString()}<br />
                selectedNetworkId: {state.selectedNetworkId?.toString()}<br />
            </pre>
        </section>

        <section>
            <h2>WalletInfo</h2>
            <pre>
                Name: {walletInfo.walletInfo?.name?.toString()}<br />
            </pre>
        </section>
    </>
  )
}
