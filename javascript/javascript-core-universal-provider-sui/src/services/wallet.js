export const signMessage = async (provider, address) => {
  if (!provider) return Promise.reject('No provider available')
  const message = 'Hello from AppKit SUI!'
  try {
    const result = await provider.request({
      method: 'sui_signPersonalMessage',
      params: { address, message }
    }, 'sui:mainnet')
    return result.signature
  } catch (error) {
    return JSON.stringify(error)
  }
} 