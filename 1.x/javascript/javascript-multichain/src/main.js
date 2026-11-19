import { appKit, wagmiAdapter } from './config/appKit'
import { store } from './store/appkitStore'
import { updateTheme, updateButtonVisibility } from './utils/dom'
import { signMessage, sendTx, getBalance } from './services/walletWagmi'
import { signMessage as signMessageSolana, sendTx as sendTxSolana, getBalance as getBalanceSolana } from './services/walletSolana'
import { initializeSubscribers } from './utils/suscribers'

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

document.getElementById('sign-message')?.addEventListener(
  'click', async () => {
    let signature = ''
    if (store.accountState.caipAddress.includes("eip155")) {
      signature = await signMessage(store.eip155Provider, store.accountState.address);
    } else {
      signature = await signMessageSolana(store.solanaProvider, store.accountState.address);
    }
    document.getElementById('signatureState').innerHTML = signature;
    document.getElementById('signatureSection').style.display = ''
  }
)

document.getElementById('send-tx')?.addEventListener(
  'click', async () => {
    let tx = '';
    if (store.accountState.caipAddress.includes("eip155")) {
      tx = await sendTx(store.eip155Provider, store.accountState.address, wagmiAdapter.wagmiConfig)
    } else {
      tx = await sendTxSolana(store.solanaProvider, store.solanaConnection, store.accountState.address)
    }
    

    document.getElementById('txState').innerHTML = JSON.stringify(tx, null, 2)
    document.getElementById('txSection').style.display = ''
  }
)

document.getElementById('get-balance')?.addEventListener(
  'click', async () => {
    let balance = ''
    if (store.accountState.caipAddress.includes("eip155")) {
      balance = await getBalance(store.eip155Provider, store.accountState.address, wagmiAdapter.wagmiConfig)
    } else{
      balance = await getBalanceSolana(store.solanaProvider, store.solanaConnection, store.accountState.address)
    }
    
    document.getElementById('balanceState').innerHTML = balance + ' ETH'
    document.getElementById('balanceSection').style.display = ''
  }
)

// Set initial theme
updateTheme(store.themeState.themeMode)
