export const signMessage = async (universalConnector, address) => {
  if (!provider) return Promise.reject('No provider available')
  const message = 'Hello from AppKit SUI!'
  try {
    return  await universalConnector.request(
      {
        method: 'stx_signMessage',
        params: {
          message,
          address
        }
      },
      'stacks:1'
    )
  } catch (error) {
    return JSON.stringify(error)
  }
} 