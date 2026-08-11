import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useAppKitNetwork,
    useWalletInfo
     } from '@reown/appkit/react'

interface InfoListProps {
    hash: string | undefined;
    signedMsg: string;
    balance: string;
    usdtHash: string;
    error: string;
}

export const InfoList = ({ hash, signedMsg, balance, usdtHash, error }: InfoListProps) => {
    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const {address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount();
    const { caipNetwork } = useAppKitNetwork()
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()

    const explorerUrl = caipNetwork?.blockExplorers?.default.url

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

  return (
    < >
        {error && (
        <section>
            <h2>Error</h2>
            <pre>
                {error}<br />
            </pre>
        </section>
        )}
        {usdtHash && (
        <section>
            <h2>Send USDT</h2>
            <pre>
                Hash: {usdtHash}<br />
            </pre>
            {explorerUrl && (
                <a href={`${explorerUrl}/#/transaction/${usdtHash}`} target="_blank" rel="noreferrer">View on explorer</a>
            )}
        </section>
        )}
        {balance && (
        <section>
            <h2>Balance: {balance}</h2>
        </section>
        )}
        {hash && (
        <section>
            <h2>Sign Tx</h2>
            <pre>
                Hash: {hash}<br />
                Status: {/* receipt?.status.toString() */}<br />
            </pre>
        </section>
        )}
        {signedMsg && (
        <section>
            <h2>Sign msg</h2>
            <pre>
                signedMsg: {signedMsg}<br />
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
                Account Type: {embeddedWalletInfo?.accountType}<br />
                {embeddedWalletInfo?.user?.email && (`Email: ${embeddedWalletInfo?.user?.email}\n`)}
                {embeddedWalletInfo?.user?.username && (`Username: ${embeddedWalletInfo?.user?.username}\n`)}
                {embeddedWalletInfo?.authProvider && (`Provider: ${embeddedWalletInfo?.authProvider}\n`)}
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
