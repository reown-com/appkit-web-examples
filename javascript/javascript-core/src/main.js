import { appKit } from './config/appKit'
import { store } from './store/appkitStore'
import { updateTheme, updateButtonVisibility } from './utils/dom'
import { initializeSubscribers } from './utils/suscribers'
import { signMessage } from './services/wallet'
import { createAppKitWalletButton } from '@reown/appkit-wallet-button'
// Initialize subscribers
initializeSubscribers(appKit);

// Create AppKit Wallet Button
const appKitWalletButton = createAppKitWalletButton();

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

document.getElementById('walletButton')?.addEventListener(
  'click', async () => {
    // check if it's ready
    if (appKitWalletButton.isReady()) {
      appKitWalletButton
          .connect('walletConnect')
          .then(data => {
              console.log('connected', data)
          })
          .catch(err => {
              console.log('error connecting', err)
          })
    } else {
      console.log('appKitWalletButton is not ready')
    }
  }
)

// Set initial theme
updateTheme(store.themeState.themeMode)
