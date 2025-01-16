import { parseEther, formatUnits } from 'viem'
import { sendTransaction, getBalance as getBalanceWagmi} from '@wagmi/core'
import {createWalletClient} from 'viem'

export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')
    
    return provider.request({
      method: 'personal_sign',
      params: ['Hello from AppKit!', address]
    })
  }

  export const sendTx = async (provider, address, wagmiAdapter) => {
    if (!provider) return Promise.reject('No provider available')

      /* const tx = {
        from: address,
        to: address, // same address just for testing
        value: parseGwei("0.0001")
      } */
        console.log(wagmiAdapter.wagmiConfig)
      const result = await sendTransaction(wagmiAdapter.wagmiConfig, {
        to: address,
        value: parseEther("0.0001"),
      })
      
      return result;
  }

  export const getBalance = async (provider, address, wagmiConfig) => {
    if (!provider) return Promise.reject('No provider available')
    
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
      return formatUnits(balance, 18)
  }
