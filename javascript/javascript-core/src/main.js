import { appKit } from './config/appKit'
import { store } from './store/appkitStore'
import { updateTheme, updateButtonVisibility } from './utils/dom'
import { initializeSubscribers } from './utils/suscribers'
import { signMessage } from './services/wallet'
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
    const signature = await signMessage(store.eip155, store.accountState.address)

    document.getElementById('signatureState').innerHTML = signature
    document.getElementById('signatureSection').style.display = ''
  }
)

// Set initial theme
updateTheme(store.themeState.themeMode)
