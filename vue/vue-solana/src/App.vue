<template>
  <div class="pages">
     <img src="/reown.svg" alt="Reown" width="150" height="150" />
     <h1>AppKit solana vue Example</h1>

     <appkit-button />
     <button @click="() => appKitWalletButton.connect('metamask')" :disabled="!isReady">
       Connect to MetaMask
     </button>
     <ActionButtonList />
     <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
        </p>
      </div>
     <InfoList />
   </div>
</template>


<script lang="ts">
import { ref, onMounted } from 'vue'
import {
  createAppKit,
} from '@reown/appkit/vue'
import { solanaWeb3JsAdapter, networks, projectId } from './config/index'

import ActionButtonList from "./components/ActionButton.vue"
import InfoList from "./components/InfoList.vue";
import { createAppKitWalletButton } from '@reown/appkit-wallet-button'



createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  metadata: {
    name: 'AppKit Vue Example',
    description: 'AppKit Vue Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

const appKitWalletButton = createAppKitWalletButton()

export default {
  name: "App",
  components: {
    ActionButtonList,
    InfoList
  },
  setup() {
    const isReady = ref(false)

    onMounted(() => {
      if (appKitWalletButton.isReady()) {
        console.log("isReady", appKitWalletButton.isReady())
        isReady.value = true
      } else {
        appKitWalletButton.subscribeIsReady(state => {
          console.log("state", state)
          isReady.value = state.isReady
        })
      }
    })

    return {
      appKitWalletButton,
      isReady
    }
  }
}
</script>