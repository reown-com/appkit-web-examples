

  export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    console.log("provider", provider.signMessage)
    return provider.signMessage({
      message: 'Hello from AppKit!',
      address: address
    })
  }
  
  export const getBalance = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

      // get the utxos ... this is the list of unspent transactions that the sender has
    const utxos = await getUTXOs(address, false)
    // return the sum of the utxos ... The balance of the sender
    return utxos.reduce((sum, utxo) => sum + utxo.value, 0)
  }

  const getUTXOs = async (address) => {
    const response = await fetch(
        `https://mempool.space/api/address/${address}/utxo`
    )
    return await response.json();
  }