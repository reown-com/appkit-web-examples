import { store, updateStore } from '../store/appkitStore'
import { updateStateDisplay, updateTheme, updateButtonVisibility } from '../utils/dom'
import { solana  } from '@reown/appkit/networks'
import { createSolanaRpc } from "@solana/kit";

export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    updateStore('solanaProvider', state['solana'])
    console.log("state inicial:",store['solanaProvider']);

    const url = modal.getCaipNetwork('solana')?.rpcUrls.default.http[0];
    if (url) {
      const rpc = createSolanaRpc(url);
      //const rpc = createSolanaRpc("https://rpc.walletconnect.org/v1/?chainId=solana%3AEtWTRABZaYq6iMfeYKouRu166VU2xqa1&projectId=3e87ce292b6e2c29c51d832bdbd90c23");
      updateStore('solanaRpc', rpc)
    }
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
    updateStateDisplay('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)
    updateStateDisplay('networkState', state)
    console.log("netowrk:", state.chainId);
    if (state.caipNetwork?.chainNamespace === 'solana') {
      const url = state.caipNetwork.rpcUrls.default.http[0];
      const rpc = createSolanaRpc(url);
      updateStore('solanaRpc', rpc)
    }
    const switchNetworkBtn = document.getElementById('switch-network')
    if (switchNetworkBtn) {
      switchNetworkBtn.textContent = `Switch to ${
        state?.chainId === solana.id ? 'Solana Devnet' : 'Solana'
      }`
    }
  })

  modal.subscribeState(state => {
    store.appKitState = state

    updateButtonVisibility(modal.getIsConnectedState())
  })
}