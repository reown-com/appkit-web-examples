import { getUniversalConnector } from './config/appKit.js'
import { signMessageStacks, signMessageSui } from './services/wallet.js'

let session = null
let address = null
let addressStacks = null

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
      addressStacks = providerSession?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]
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


  document.getElementById('sign-message-stacks').addEventListener('click', async () => {
    if (!session) return
    const signature = await signMessageStacks(universalConnector, addressStacks)
    document.getElementById('signatureState').textContent = typeof signature === 'object' ? JSON.stringify(signature, null, 2) : signature
  })

  document.getElementById('sign-message-sui').addEventListener('click', async () => {
    if (!session) return
    const signature = await signMessageSui(universalConnector, address)
    document.getElementById('signatureState').textContent = typeof signature === 'object' ? JSON.stringify(signature, null, 2) : signature
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
  addressStacks = session?.namespaces?.stacks?.accounts?.[0]?.split(':')[2]
  document.getElementById('accountState').textContent = "sui: " + address || ''
  document.getElementById('accountStateStacks').textContent = "stacks: " + addressStacks || ''
}

/**
 * Updates the visibility of connect, disconnect and sign buttons
 * Shows/hides buttons based on whether there is an active session
 */
function updateButtons() {
  const connectBtn = document.getElementById('open-connect-modal');
  const disconnectBtn = document.getElementById('disconnect');
  const signBtnStacks = document.getElementById('sign-message-stacks');
  const signBtnSui = document.getElementById('sign-message-sui');
  if (session) {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = '';
    signBtnStacks.style.display = '';
    signBtnSui.style.display = '';
  } else {
    connectBtn.style.display = '';
    disconnectBtn.style.display = 'none';
    signBtnStacks.style.display = 'none';
    signBtnSui.style.display = 'none';
  }
}

function updateInfo() {
  updateSession()
  updateAccount()
  updateButtons()
}

setup()