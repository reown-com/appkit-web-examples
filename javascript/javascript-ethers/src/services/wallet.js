import { BrowserProvider, Contract, formatUnits, parseEther } from 'ethers'

export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    return provider.request({
      method: 'personal_sign',
      params: ['Hello from AppKit!', address]
    })
  }

  export const sendTx = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

      const tx = {
        from: address,
        to: address, // same address just for testing
        value: parseEther("0.0001")
      }
      const ethersProvider = new BrowserProvider(provider);
      const signer = await ethersProvider.getSigner()
      return await signer.sendTransaction(tx)
  }

  export const getBalance = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    const balance = await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    })
    return formatUnits(balance, 'ether')
  }
