
<template>
  <div class="pages">
      <img src="/reown.svg" alt="Reown" width="150" height="150" />
      <h1>AppKit Vue Universal Connector Example</h1>
      <h2>Universal Connector + SUI + Stacks</h2>
      <ActionButtonList 
        :universal-connector="universalConnector" 
        :session="session" 
        @update:session="setSession" 
      />
      <div class="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://dashboard.reown.com" target="_blank" class="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
        </p>
      </div>
   </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { UniversalConnector } from '@reown/appkit-universal-connector'
import { getUniversalConnector } from './config/index'
import ActionButtonList from "./components/ActionButton.vue"

export default {
  name: "App",
  components: {
    ActionButtonList
  },
  setup() {
    const universalConnector = ref<UniversalConnector>()
    const session = ref<any>()

    onMounted(async () => {
      const connector = await getUniversalConnector()
      universalConnector.value = connector
    })

    watch(() => universalConnector.value?.provider.session, (newSession) => {
      session.value = newSession
    })

    const setSession = (newSession: any) => {
      session.value = newSession
    }

    return {
      universalConnector,
      session,
      setSession
    }
  }
};
</script>