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
     const ethBalance = formatUnits(BigInt(balance), 18)
     return ethBalance
  }
