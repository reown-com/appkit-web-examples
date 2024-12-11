<template>
  <div>
    <button @click="openAppKit">Open</button>
    <button @click="handleDisconnect">Disconnect</button>
    <button @click="switchToNetwork">Switch</button>
  </div>
</template>

<script>
import { useDisconnect, useAppKit, useAppKitNetwork } from "@reown/appkit/vue";
import { networks } from "../config/index";

export default {
  name: "ActionButtonList",
  setup() {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const networkData = useAppKitNetwork();

    const openAppKit = () => open();
    const switchToNetwork = () => networkData.value.switchNetwork(networks[1]);
    const handleDisconnect = async () => {
        try {
          await disconnect();
        } catch (error) {
          console.error("Error during disconnect:", error);
        }
    };


    return {
      handleDisconnect,
      openAppKit,
      switchToNetwork,
    };
  },
};
</script>
