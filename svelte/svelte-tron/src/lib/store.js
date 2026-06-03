import { writable } from 'svelte/store'
import { appKit } from '../config/appKit'

// Svelte stores mirroring AppKit state. AppKit exposes framework-agnostic
// `subscribe*` methods; we forward their updates into writable stores so any
// Svelte component can reactively read them with the `$store` syntax.
export const account = writable(appKit.getAccount() ?? {})
export const network = writable({})
export const appKitState = writable({})
export const theme = writable({ themeMode: 'light', themeVariables: {} })
export const events = writable([])
export const walletInfo = writable({})

// The Tron wallet provider (used for signing). Populated via subscribeProviders.
export const tronProvider = writable(null)

appKit.subscribeAccount(state => account.set(state))
appKit.subscribeNetwork(state => network.set(state))
appKit.subscribeState(state => appKitState.set(state))
appKit.subscribeTheme(state => theme.set(state))
appKit.subscribeEvents(state => events.set(state))
appKit.subscribeWalletInfo(state => walletInfo.set(state))
appKit.subscribeProviders(state => tronProvider.set(state['tron'] ?? null))
