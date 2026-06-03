<script>
  import { account, network, appKitState, theme, events, walletInfo } from './store'

  $effect(() => {
    console.log('Events: ', $events)
  })
</script>

<section>
  <h2>Account</h2>
  <pre>Address: {$account?.address ?? ''}
caip Address: {$account?.caipAddress ?? ''}
Connected: {($account?.isConnected ?? false).toString()}
Account Type: {$account?.embeddedWalletInfo?.accountType ?? ''}</pre>
</section>

<section>
  <h2>Network</h2>
  <pre>Network: {$network?.caipNetwork?.name ?? ''}
Chain ID: {$network?.chainId?.toString() ?? ''}</pre>
</section>

<section>
  <h2>Theme</h2>
  <pre>Theme: {$theme?.themeMode ?? ''}</pre>
</section>

<section>
  <h2>State</h2>
  <pre>Selected Network ID: {$appKitState?.selectedNetworkId?.toString() ?? ''}
loading: {($appKitState?.loading ?? false).toString()}
open: {($appKitState?.open ?? false).toString()}</pre>
</section>

<section>
  <h2>WalletInfo</h2>
  <pre>Name: {$walletInfo?.name?.toString() ?? ''}</pre>
</section>
