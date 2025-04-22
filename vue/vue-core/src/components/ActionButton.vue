<template>
  <div>
    <button @click="openAppKit">Open</button>
    <button @click="handleDisconnect">Disconnect</button>
    <button @click="switchToNetwork">Switch</button>
    <button @click="handleSignMsg">Sign MSG</button>
  </div>
</template>

<script>
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider } from "@reown/appkit/vue";
import { networks } from "../config/index";

export default {
  name: "ActionButtonList",
  setup() {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const networkData = useAppKitNetwork();
    const { address } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
    const { walletProvider}  = useAppKitProvider('eip155');
    console.log(">> walletProvider", walletProvider);

    const openAppKit = () => open();
    const switchToNetwork = () => networkData.value.switchNetwork(networks[1]);
    const handleDisconnect = async () => {
        try {
          await disconnect();
        } catch (error) {
          console.error("Error during disconnect:", error);
        }
    };


    // function to sing a msg 
    const handleSignMsg = async () => {
      const message = "Hello Reown AppKit!" // message to sign
      try {
        const result = await walletProvider.request({
          method: 'personal_sign',
          params: [message, address]
        }) 
        
        console.log("result", result);
      } catch (error) {
        console.log("error", error);
        throw new Error(error);
      }
    }



    return {
      handleDisconnect,
      openAppKit,
      switchToNetwork,
      handleSignMsg
    };
  },
};
</script>
