export const store = {
    accountState: {},
    networkState: {},
    appKitState: {},
    themeState: { themeMode: 'light', themeVariables: {} },
    events: [],
    walletInfo: {},
    solanaProvider: null,
    solanaConnection: null
  }
  
  export const updateStore = (key, value) => {
    store[key] = value
  }