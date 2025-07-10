import { initializeProvider, initializeAppKit, provider, appKit } from './config/appKit.js'
import { signMessage } from './services/wallet.js'

let session = null
let address = null


const updateInfo = () => {
  updateSession()
  updateAccount()
  updateButtons()
}

/**
 * Main setup function that initializes the provider, sets up event listeners,
 * and configures button click handlers
 */
async function setup() {
  const prov = await initializeProvider()
  let appkit = initializeAppKit(prov)

  // check if session is already connected
  if (prov.session) {
    session = prov.session
    updateInfo();
  }

  // Listen for session events
  
  /**
   * Handles initial connection event
   * Updates session state and UI when wallet first connects
   */
  prov.on('connect', (sess) => {
    session = sess.session
    updateInfo();
  })

  /**
   * Handles disconnect event
   * Clears session and address, updates UI when wallet disconnects
   */
  prov.on('disconnect', () => {
    session = null
    address = null
    updateInfo();
  })

  /**
   * Handles successful connection
   * Updates session state and closes modal after connection
   */
  prov.on('connect', async (sess) => {
    session = sess.session
    const modal = initializeAppKit(provider)
    await modal?.close()
    updateInfo();
  })

  /**
   * Handles QR code display
   * Opens AppKit modal with WalletConnect URI when QR needs to be shown
   */
  prov.on('display_uri', (uri) => {
    appkit = initializeAppKit(prov)
    appkit?.open({ uri, view: 'ConnectingWalletConnectBasic' })
  })

  // Button event listeners
  document.getElementById('open-connect-modal').addEventListener('click', async () => {
    await prov.connect({
      optionalNamespaces: {
        sui: {
          methods: ['sui_signPersonalMessage'],
          chains: ['sui:mainnet'],
          events: []
        }
      }
    })
  })

  document.getElementById('disconnect').addEventListener('click', async () => {
    await prov.disconnect()
    session = null
    address = null
    updateInfo();
  })

  document.getElementById('sign-message').addEventListener('click', async () => {
    if (!session) return
    address = session?.namespaces?.sui?.accounts?.[0]?.split(':')[2]
    const signature = await signMessage(prov, address)
    document.getElementById('signatureState').textContent = signature
  })
  updateButtons()
}

/**
 * Updates the session state display in the UI
 * Shows the current session information in JSON format or empty if no session
 */
function updateSession() {
  document.getElementById('sessionState').textContent = session ? JSON.stringify(session, null, 2) : ''
}

/**
 * Updates the account address display in the UI
 * Extracts and shows the SUI address from the session namespace
 */
function updateAccount() {
  address = session?.namespaces?.sui?.accounts?.[0]?.split(':')[2]
  document.getElementById('accountState').textContent = address || ''
}

/**
 * Updates the visibility of connect, disconnect and sign buttons
 * Shows/hides buttons based on whether there is an active session
 */
function updateButtons() {
  const connectBtn = document.getElementById('open-connect-modal');
  const disconnectBtn = document.getElementById('disconnect');
  const signBtn = document.getElementById('sign-message');
  if (session) {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = '';
    signBtn.style.display = '';
  } else {
    connectBtn.style.display = '';
    disconnectBtn.style.display = 'none';
    signBtn.style.display = 'none';
  }
}

setup()