import { store, updateStore } from '../store/appkitStore'
import { updateStateDisplay, updateTheme, updateButtonVisibility } from '../utils/dom'
import { polygon, mainnet } from '@reown/appkit/networks'

export const initializeSubscribers = (modal) => {
  modal.subscribeProviders(state => {
    updateStore('bip122Provider', state['bip122'])
  })

  modal.subscribeAccount(state => {
    updateStore('accountState', state)
    updateStateDisplay('accountState', state)
  })

  modal.subscribeNetwork(state => {
    updateStore('networkState', state)
    updateStateDisplay('networkState', state)
  })

  modal.subscribeState(state => {
    store.appKitState = state

    updateButtonVisibility(modal.getIsConnectedState())
  })
}