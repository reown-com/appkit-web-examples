import { useEffect, useState } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useWalletInfo,
    useAppKitProvider, 
    useAppKitNetworkCore,
    type Provider 
     } from '@reown/appkit/react'
import { BrowserProvider } from 'ethers'

interface InfoListProps {
    hash: string;
    signedMsg: string;
    balance: string;
}

export const InfoList = ({ hash, signedMsg, balance }: InfoListProps) => {
    const [statusTx, setStatusTx] = useState('');

    const { themeMode, themeVariables } = useAppKitTheme();
    const state = useAppKitState();
    const { chainId } = useAppKitNetworkCore();
    const {address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount(); // AppKit hook to get the account information
    const events = useAppKitEvents()
    const walletInfo = useWalletInfo()
    const { walletProvider } = useAppKitProvider<Provider>('eip155')

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

    
    useEffect(() => {
        const checkTransactionStatus = async () => {
            if (hash && walletProvider) {
                try {
                    const provider = new BrowserProvider(walletProvider, chainId)
                    const receipt = await provider.getTransactionReceipt(hash)
                    setStatusTx(receipt?.status === 1 ? 'Success' : receipt?.status === 0 ? 'Failed' : 'Pending')
                } catch (err) {
                    console.error('Error checking transaction status:', err)
                    setStatusTx('Error')
                }
            }
        }

        checkTransactionStatus()
    }, [hash, walletProvider])

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
                Status: {statusTx}<br />
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
