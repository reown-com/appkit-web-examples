import { useEffect, useState } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useAppKitNetwork,
    useWalletInfo
     } from '@reown/appkit/react'
import { solanaDevnet, solanaTestnet } from '@reown/appkit/networks'
import { signature } from '@solana/kit'
import { useSolanaRpc } from '../hooks/useSolanaRpc'

// Solscan uses the same URL for every cluster, selected with a query param
const getSolscanTxUrl = (hash: string, chainId?: string | number) => {
    const cluster =
        chainId === solanaDevnet.id ? '?cluster=devnet' :
        chainId === solanaTestnet.id ? '?cluster=testnet' : '';
    return `https://solscan.io/tx/${hash}${cluster}`;
}

interface InfoListProps {
    hash: string | undefined;
    signedMsg: string;
    balance: string;
}

export const InfoList = ({ hash, signedMsg, balance }: InfoListProps) => {
    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const {address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount();
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()
    const { caipNetwork } = useAppKitNetwork()
    const rpc = useSolanaRpc()
    const [txStatus, setTxStatus] = useState<string>()

    // poll the tx status until it is finalized or fails
    useEffect(() => {
        if (!hash || !rpc) return;
        setTxStatus('pending');

        let done = false;
        const interval = setInterval(async () => {
            const { value: [status] } = await rpc.getSignatureStatuses([signature(hash)]).send();
            if (done || !status) return;

            setTxStatus(status.err ? 'failed' : status.confirmationStatus ?? 'pending');
            if (status.err || status.confirmationStatus === 'finalized') {
                done = true;
                clearInterval(interval);
            }
        }, 2000);

        return () => {
            done = true;
            clearInterval(interval);
        };
    }, [hash, rpc]);

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

  return (
    < >
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
                Status: {txStatus}<br />
                <a href={getSolscanTxUrl(hash, caipNetwork?.id)} target="_blank" rel="noopener noreferrer">View on Solscan</a><br />
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
