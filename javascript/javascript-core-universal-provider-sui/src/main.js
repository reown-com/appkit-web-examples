import { initializeProvider, initializeAppKit, provider, appKit } from './config/appKit.js'
import { signMessage } from './services/wallet.js'

let session = null
let address = null

async function setup() {
  const prov = await initializeProvider()
  let appkit = initializeAppKit(prov)

  // Listen for session events
  prov.on('connect', (sess) => {
    session = sess.session
    updateSession()
    updateAccount()
    updateButtons()
  })
  prov.on('disconnect', () => {
    session = null
    address = null
    updateSession()
    updateAccount()
    updateButtons()
  })

  prov.on('connect', async (sess) => {
    session = sess.session
    const modal = initializeAppKit(provider)
    await modal?.close()
    updateSession()
    updateAccount()
    updateButtons()
  })

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
    updateSession()
    updateAccount()
    updateButtons()
  })

  document.getElementById('sign-message').addEventListener('click', async () => {
    if (!session) return
    address = session?.namespaces?.sui?.accounts?.[0]?.split(':')[2]
    const signature = await signMessage(prov, address)
    document.getElementById('signatureState').textContent = signature
  })
  updateButtons()
}

function updateSession() {
  document.getElementById('sessionState').textContent = session ? JSON.stringify(session, null, 2) : ''
}

function updateAccount() {
  address = session?.namespaces?.sui?.accounts?.[0]?.split(':')[2]
  document.getElementById('accountState').textContent = address || ''
}

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