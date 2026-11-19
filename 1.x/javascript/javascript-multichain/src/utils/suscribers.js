import { store, updateStore } from '../store/appkitStore'
import { updateStateDisplay, updateTheme, updateButtonVisibility } from '../utils/dom'
import { polygon, mainnet, solana } from '@reown/appkit/networks'
import { Connection } from "@solana/web3.js";

export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    if (state['eip155']) {
      updateStore('eip155Provider', state['eip155'])
    } else {
      updateStore('solanaProvider', state['solana'])

      const url = state['solana'].getActiveChain().rpcUrls.default.http[0];
      const connection = new Connection(url);
      
      updateStore('solanaConnection', connection)
    }
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
    updateStateDisplay('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)

    if (store['solanaProvider']) {
      const arrayChain = store['solanaProvider'].requestedChains
      const selectedChain = arrayChain.find(chain => chain.id === state.chainId);
      const url = selectedChain.rpcUrls.default.http[0];
      const connection = new Connection(url);
      updateStore('solanaConnection', connection)
    }
    
  })

  modal.subscribeState(state => {
    store.appKitState = state

    updateButtonVisibility(modal.getIsConnectedState())
  })
}