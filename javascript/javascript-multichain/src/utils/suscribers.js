import { store, updateStore } from '../store/appkitStore'
import { updateStateDisplay, updateTheme, updateButtonVisibility } from '../utils/dom'
import { polygon, mainnet, solana } from '@reown/appkit/networks'
import { createSolanaRpc } from "@solana/kit";

export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    updateStore('eip155Provider', state['eip155'])
    updateStore('solanaProvider', state['solana'])

    const url = modal.getCaipNetwork('solana')?.rpcUrls.default.http[0];
    if (url) {
      const rpc = createSolanaRpc(url);
      updateStore('solanaRpc', rpc)
    }
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
    updateStateDisplay('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)

    if (state.caipNetwork?.chainNamespace === 'solana') {
      const url = state.caipNetwork.rpcUrls.default.http[0];
      const rpc = createSolanaRpc(url);
      updateStore('solanaRpc', rpc)
    }
    
  })

  modal.subscribeState(state => {
    store.appKitState = state

    updateButtonVisibility(modal.getIsConnectedState())
  })
}