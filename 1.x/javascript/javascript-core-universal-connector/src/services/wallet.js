export const signMessageStacks = async (universalConnector, address) => {
  if (!universalConnector) return Promise.reject('No universalConnector available')
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

export const signMessageSui = async (universalConnector, address) => {
  if (!universalConnector) return Promise.reject('No universalConnector available')
  const message = 'Hello from AppKit SUI!'
  try {
    return await universalConnector.request(
      {
        method: 'sui_signPersonalMessage',
        params: { address, message }
      },
      'sui:mainnet'
    )
  } catch (error) {
    return JSON.stringify(error)
  }
}