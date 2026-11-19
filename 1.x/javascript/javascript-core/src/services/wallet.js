const toHex = (str) =>
  '0x' + Array.from(new TextEncoder().encode(str), (b) => b.toString(16).padStart(2, '0')).join('')

export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

    return provider.request({
      method: 'personal_sign',
      params: [toHex('Hello from AppKit!'), address]
    })
  }
