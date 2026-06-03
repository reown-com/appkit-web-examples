<script>
  import { appKit, networks } from '../config/appKit'
  import { account, tronProvider } from './store'

  let signature = $state('')
  let balance = $state('')

  const isConnected = $derived($account?.isConnected ?? false)

  async function handleDisconnect() {
    try {
      await appKit.disconnect()
      signature = ''
      balance = ''
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  async function handleSignMessage() {
    const provider = $tronProvider
    const address = $account?.address
    if (!provider || !address) return
    try {
      signature = await provider.signMessage({
        message: 'Hello from AppKit Tron example!',
        from: address
      })
    } catch (error) {
      console.error('Failed to sign message:', error)
    }
  }

  async function handleGetBalance() {
    try {
      // The `fetchBalance` helper is React/Vue-only, so we call the public
      // base-client methods it wraps directly.
      const address = appKit.getAddress()
      const namespace = appKit.getActiveChainNamespace()
      const chainId = appKit.getCaipNetwork()?.id
      if (!address || !namespace || !chainId) {
        console.error('Not able to retrieve balance')
        return
      }
      const result = await appKit.updateNativeBalance(address, chainId, namespace)
      if (result) {
        balance = `${result.balance} ${result.symbol}`
      } else {
        console.error('No balance found')
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    }
  }
</script>

<div>
  <button onclick={() => appKit.open()}>Open</button>
  <button onclick={handleDisconnect}>Disconnect</button>
  <button onclick={() => appKit.switchNetwork(networks[1])}>Switch</button>
  <button onclick={handleSignMessage} disabled={!isConnected}>Sign Message</button>
  <button onclick={handleGetBalance} disabled={!isConnected}>Get Balance</button>
</div>

{#if signature || balance}
  <section>
    <h2>Actions</h2>
    <pre>{#if balance}Balance: {balance}
{/if}{#if signature}Signature: {signature}{/if}</pre>
  </section>
{/if}
