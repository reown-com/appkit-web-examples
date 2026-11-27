<template>
  <div>
    <div v-if="session">
      <button @click="handleDisconnect">Disconnect</button>
      <button @click="handleSignSUIMsg">Sign SUI msg</button>
      <button @click="handleSignStacksMsg">Sign Stacks msg</button>
      <div>
        <p>Sui Account: {{ session.namespaces?.sui?.accounts?.[0] }}</p>
        <p>Stacks Account: {{ session.namespaces?.stacks?.accounts?.[0] }}</p>
      </div>
      <br/>
    </div>
    <div v-else>
      <button @click="handleConnect">Open</button>
    </div>
  </div>
</template>

<script lang="ts">
import { UniversalConnector } from "@reown/appkit-universal-connector";

export default {
  name: "ActionButtonList",
  props: {
    universalConnector: {
      type: Object as () => UniversalConnector | undefined,
      required: true
    },
    session: {
      type: Object,
      default: null
    }
  },
  emits: ['update:session'],
  methods: {
    // function to sign a msg 
    async handleSignSUIMsg() {
      if (!this.universalConnector) {
        return
      }

      const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = this.session?.namespaces['sui']?.accounts[0]
        if (!account) {
          throw new Error('No account found')
        }

        const result = await this.universalConnector.request(
          {
            method: 'sui_signPersonalMessage',
            params: [message]
          },
          'sui:mainnet'
        )
        // eslint-disable-next-line no-console
        console.log('>> Sui Sign Message result', result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('>> Sui Sign Message error', error)
      }
    },
    
    async handleSignStacksMsg() {
      if (!this.universalConnector) {
        return
      }

      const message = "Hello Reown AppKit!" // message to sign
      try {
        const account = this.session?.namespaces['stacks']?.accounts[0].split(':')[2]
        if (!account) {
          throw new Error('No account found')
        }

        const result = await this.universalConnector.request(
          {
            method: 'stx_signMessage',
            params: {
              message,
              address: account
            }
          },
          'stacks:1'
        )
        // eslint-disable-next-line no-console
        console.log('>> Stacks Sign Message result', result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('>> Stacks Sign Message error', error)
      }
    },

    async handleDisconnect() {
      if (!this.universalConnector) {
        return
      }
      await this.universalConnector.disconnect()
      this.$emit('update:session', null)
    },

    async handleConnect() {
      if (!this.universalConnector) {
        return
      }
  
      const { session: providerSession } = await this.universalConnector.connect()
      this.$emit('update:session', providerSession)
    }
  }
};
</script>
