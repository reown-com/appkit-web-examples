import { store, updateStore } from '../store/appkitStore'
import { updateStateDisplay, updateTheme, updateButtonVisibility } from '../utils/dom'
import { solana  } from '@reown/appkit/networks'
import { Connection } from "@solana/web3.js";

export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    updateStore('solanaProvider', state['solana'])
    console.log("state inicial:",store['solanaProvider']);
    console.log("Chains:",store['solanaProvider'].requestedChains);
    const url = state['solana'].getActiveChain().rpcUrls.default.http[0];
    const connection = new Connection(url);
    //const connection = new Connection("https://rpc.walletconnect.org/v1/?chainId=solana%3AEtWTRABZaYq6iMfeYKouRu166VU2xqa1&projectId=3e87ce292b6e2c29c51d832bdbd90c23");
    
    updateStore('solanaConnection', connection)
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
    updateStateDisplay('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)
    updateStateDisplay('networkState', state)
    console.log("netowrk:", state.chainId);
    if (store['solanaProvider']) {
      const arrayChain = store['solanaProvider'].requestedChains
      const selectedChain = arrayChain.find(chain => chain.id === state.chainId);
      const url = selectedChain.rpcUrls.default.http[0];
      const connection = new Connection(url);
      updateStore('solanaConnection', connection)
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