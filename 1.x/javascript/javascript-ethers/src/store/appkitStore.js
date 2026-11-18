export const store = {
    accountState: {},
    networkState: {},
    appKitState: {},
    themeState: { themeMode: 'light', themeVariables: {} },
    events: [],
    walletInfo: {},
    eip155Provider: null
  }
  
  export const updateStore = (key, value) => {
    store[key] = value
  }