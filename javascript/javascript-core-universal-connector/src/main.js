import { getUniversalConnector } from './config/appKit.js'
import { signMessage } from './services/wallet.js'

let session = null
let address = null

/**
 * Main setup function that initializes the provider, sets up event listeners,
 * and configures button click handlers
 */
async function setup() {
  const universalConnector = await getUniversalConnector()

  // check if session is already connected
  if (universalConnector?.provider.session) {
    session = universalConnector?.provider.session
    updateInfo();
  }

  // Button event listeners
  document.getElementById('open-connect-modal').addEventListener('click', async () => {
    if (!universalConnector) {
      return
    }

    const { session: providerSession } = await universalConnector.connect()
    // get the address from the session
    if (providerSession?.namespaces?.sui?.accounts?.[0]?.split(':')[2]) {
      address = providerSession?.namespaces?.sui?.accounts?.[0]?.split(':')[2]
    } else if (providerSession?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]) {
      address = providerSession?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]
    }
    // update the session
    session = providerSession;
    updateInfo();
  })

  document.getElementById('disconnect').addEventListener('click', async () => {
    if (!universalConnector) {
      return
    }
    await universalConnector.disconnect()
    session = null
    address = null
    updateInfo();
  })

  document.getElementById('sign-message').addEventListener('click', async () => {
    if (!session) return
    const signature = await signMessage(universalConnector, address)
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

function updateInfo() {
  updateSession()
  updateAccount()
  updateButtons()
}

setup()