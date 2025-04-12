export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    return provider.request({
      method: 'personal_sign',
      params: ['Hello from AppKit!', address]
    })
  }
