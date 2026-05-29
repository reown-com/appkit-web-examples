<template>
  <section>
    <h2>useAppKit</h2>
    <pre>
Address: {{ accountInfo.address }}
caip Address: {{ accountInfo.caipAddress }}
Connected: {{ accountInfo.isConnected }}
Status: {{ accountInfo.status }}
User Email: {{ accountInfo?.embeddedWalletInfo?.user?.email }}
    </pre>
  </section>

  <section>
    <h2>Theme</h2>
    <pre>
Theme: {{ kitTheme.themeMode }}
    </pre>
  </section>

  <section>
    <h2>State</h2>
    <pre>
open: {{ state.open }}
selectedNetworkId: {{ state.selectedNetworkId }}
    </pre>
  </section>

  <section>
    <h2>WalletInfo</h2>
    <pre>
Name: {{ walletInfo }}<br />
    </pre>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import type { DefineComponent } from 'vue';
import {
useAppKitState,
useAppKitTheme,
useAppKitEvents,
useAppKitAccount,
useWalletInfo,
} from "@reown/appkit/vue";
import type { ThemeMode, CaipNetworkId } from "@reown/appkit/vue";


export interface ComponentData {
kitTheme: ReturnType<typeof useAppKitTheme>;
state: ReturnType<typeof useAppKitState>;
accountInfo: ReturnType<typeof useAppKitAccount>;
walletInfo: ReturnType<typeof useWalletInfo>;
}

export default defineComponent({
name: "InfoList",
setup(): ComponentData {
  const kitTheme = useAppKitTheme();
  const state = useAppKitState();
  const accountInfo = useAppKitAccount();
  const events = useAppKitEvents();
  const walletInfo = useWalletInfo();

  onMounted(() => {
    console.log("Events: ", events);
  });

  return {
    kitTheme,
    state,
    accountInfo,
    walletInfo,
  };
},
});
</script>