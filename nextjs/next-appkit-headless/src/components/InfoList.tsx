'use client'

import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useWalletInfo
     } from '@reown/appkit/react'

export const InfoList = () => {
    const kitTheme = useAppKitTheme() // AppKit hook to get the theme information and theme actions
    const state = useAppKitState() // AppKit hook to get the state
    const { address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount() // AppKit hook to get the account information
    const events = useAppKitEvents() // AppKit hook to get the events
    const { walletInfo } = useWalletInfo() // AppKit hook to get the wallet info

    useEffect(() => {
        console.log("Events: ", events)
    }, [events])

    useEffect(() => {
        console.log("Embedded Wallet Info: ", embeddedWalletInfo)
    }, [embeddedWalletInfo])

  return (
    <>
        <section>
            <h2>Account Info</h2>
            <pre>
                Address: {address}<br />
                CAIP Address: {caipAddress}<br />
                Connected: {isConnected.toString()}<br />
                Status: {status}<br />
                {embeddedWalletInfo?.accountType && `Account Type: ${embeddedWalletInfo?.accountType}\n`}
                {embeddedWalletInfo?.user?.email && `Email: ${embeddedWalletInfo?.user?.email}\n`}
                {embeddedWalletInfo?.user?.username && `Username: ${embeddedWalletInfo?.user?.username}\n`}
                {embeddedWalletInfo?.authProvider && `Provider: ${embeddedWalletInfo?.authProvider}\n`}
            </pre>
        </section>

        <section>
            <h2>Theme</h2>
            <pre>
                Theme: {kitTheme.themeMode}<br />
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
            <h2>Wallet Info</h2>
            <pre>
                Name: {JSON.stringify(walletInfo)}<br />
            </pre>
        </section>
    </>
  )
}
