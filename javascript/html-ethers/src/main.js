import { arbitrum, mainnet, optimism, polygon, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

// @ts-expect-error 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// Create adapter
const ethersAdapter = new EthersAdapter()

// Instantiate AppKit
const modal = createAppKit({
  adapters: [ethersAdapter],
  networks: [arbitrum, mainnet, optimism, polygon, sepolia],
  projectId,
  themeVariables: {
    '--w3m-accent': '#000000',
    '--w3m-border-radius-master': '0px',
  }
})

let accountState = {}
let networkState = {}
let appKitState = {}
let themeState = { themeMode: 'light', themeVariables: {} }
let events = []
let walletInfo = {}
let eip155Provider = null

const updateStateDisplay = (elementId, state) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = JSON.stringify(state, null, 2)
  }
}

// Update theme
const updateTheme = mode => {
  document.documentElement.setAttribute('data-theme', mode)
  document.body.className = mode
}

// Subscribe to state changes
modal.subscribeAccount(state => {
  // useAppKitAccount
  accountState = state
  updateStateDisplay('accountState', state)
})

modal.subscribeNetwork(state => {
  // useAppKitNetwork
  networkState = state
  updateStateDisplay('networkState', state)

  // Update switch network button text
  const switchNetworkBtn = document.getElementById('switch-network')
  if (switchNetworkBtn) {
    switchNetworkBtn.textContent = `Switch to ${
      state?.chainId === polygon.id ? 'Mainnet' : 'Polygon'
    }`
  }
})

modal.subscribeState(state => {
  // useAppKitState
  appKitState = state
  updateStateDisplay('appKitState', state)
})

modal.subscribeTheme(state => {
  // useAppKitTheme
  themeState = state
  updateStateDisplay('themeState', state)
  updateTheme(state.themeMode)
})

modal.subscribeEvents(state => {
  // useAppKitEvents
  events = state
  updateStateDisplay('events', state)
})

modal.subscribeWalletInfo(state => {
  // useAppKitWalletInfo
  walletInfo = state
  updateStateDisplay('walletInfo', state)
})

modal.subscribeProviders(state => {
  // useAppKitProviders
  eip155Provider = state['eip155']
})

// Button event listeners
document.getElementById('open-connect-modal')?.addEventListener('click', () => modal.open())
document
  .getElementById('open-network-modal')
  ?.addEventListener('click', () => modal.open({ view: 'Networks' }))

document.getElementById('toggle-theme')?.addEventListener('click', () => {
  const newTheme = themeState.themeMode === 'dark' ? 'light' : 'dark'
  modal.setThemeMode(newTheme)
  themeState = { ...themeState, themeMode: newTheme }
  updateTheme(newTheme)
})

document.getElementById('switch-network')?.addEventListener('click', () => {
  const currentChainId = networkState?.chainId
  modal.switchNetwork(currentChainId === polygon.id ? mainnet : polygon)
})

document.getElementById('sign-message')?.addEventListener('click', () => {
  signMessage()
})

export function signMessage() {
  if (eip155Provider) {
    eip155Provider.request({
      method: 'personal_sign',
      params: ['Hello from AppKit!', accountState.address]
    }).then(signature => {
      console.log('Signature:', signature)
    }).catch(error => {
      console.error('Error signing message:', error)
    })
  }
}

// Set initial theme
updateTheme(themeState.themeMode)