import { appKit } from './config/appKit'
import { store } from './store/appkitStore'
import { updateTheme, updateButtonVisibility } from './utils/dom'
import { signMessage, sendTx, getBalance, watchTxStatus, getSolscanTxUrl } from './services/wallet'
import { initializeSubscribers } from './utils/suscribers'
import { solana, solanaDevnet } from '@reown/appkit/networks'

let stopTxStatus

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
    const tx = await sendTx(store.solanaProvider, store.solanaRpc, store.accountState.address)
    console.log('Tx:', tx)

    document.getElementById('txState').innerHTML = tx
    const txLink = document.getElementById('txLink')
    txLink.href = getSolscanTxUrl(tx, store.networkState?.chainId)
    document.getElementById('txSection').style.display = ''

    stopTxStatus?.()
    stopTxStatus = watchTxStatus(store.solanaRpc, tx, status => {
      document.getElementById('txStatus').innerHTML = status
    })
  }
)

document.getElementById('get-balance')?.addEventListener(
  'click', async () => {
    const balance = await getBalance(store.solanaProvider, store.solanaRpc, store.accountState.address)
    
    document.getElementById('balanceState').innerHTML = balance + ' SOL'
    document.getElementById('balanceSection').style.display = ''
  }
)

// Set initial theme
updateTheme(store.themeState.themeMode)
