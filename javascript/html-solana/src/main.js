import { appKit } from './config/appKit'
import { store } from './store/appkitStore'
import { updateTheme, updateButtonVisibility } from './utils/dom'
import { signMessage, sendTx, getBalance } from './services/wallet'
import { initializeSubscribers } from './utils/suscribers'
import { solana, solanaDevnet } from '@reown/appkit/networks'

// Initialize subscribers
initializeSubscribers(appKit)

// Initial check
updateButtonVisibility(appKit.getIsConnectedState());

// Button event listeners
document.getElementById('open-connect-modal')?.addEventListener(
  'click', () => appKit.open()
)

document.getElementById('disconnect')?.addEventListener(
  'click', () => {
    appKit.disconnect()
  }
)

document.getElementById('switch-network')?.addEventListener(
  'click', () => {
    const currentChainId = store.networkState?.chainId
    appKit.switchNetwork(currentChainId === solana.id ? solana : solanaDevnet)
  }
)

document.getElementById('sign-message')?.addEventListener(
  'click', async () => {
    const signature = await signMessage(store.solanaProvider, store.accountState.address)

    document.getElementById('signatureState').innerHTML = signature
    document.getElementById('signatureSection').style.display = ''
  }
)

document.getElementById('send-tx')?.addEventListener(
  'click', async () => {
    const tx = await sendTx(store.solanaProvider, store.solanaConnection, store.accountState.address)
    console.log('Tx:', tx)

    document.getElementById('txState').innerHTML = JSON.stringify(tx, null, 2)
    document.getElementById('txSection').style.display = ''
  }
)

document.getElementById('get-balance')?.addEventListener(
  'click', async () => {
    const balance = await getBalance(store.solanaProvider, store.solanaConnection, store.accountState.address)
    
    document.getElementById('balanceState').innerHTML = balance + ' SOL'
    document.getElementById('balanceSection').style.display = ''
  }
)

// Set initial theme
updateTheme(store.themeState.themeMode)
