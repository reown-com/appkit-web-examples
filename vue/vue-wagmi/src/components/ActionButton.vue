<template>
    <div>
      <div v-if="accountData.isConnected">
        <button @click="handleDisconnect">Disconnect</button>
        <button @click="switchToNetwork">Switch</button>
        <button @click="handleSignMessage">Sign Message</button>
        <button @click="handleSendTx">Send a Transaction</button>

        <div v-if="hash">Transaction Hash: {{ hash }}</div>
      </div>
      <button v-else @click="openAppKit">Open</button>
    </div>
  </template>
  
  <script>
  import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount} from "@reown/appkit/vue";
  import { networks } from "../config/index";
  import { useEstimateGas, useSendTransaction, useSignMessage } from '@wagmi/vue'
  import { parseGwei } from 'viem'
  import { watchEffect } from 'vue';
  
      // test transaction
      const TEST_TX = {
      to: "0x50200216532355Fa9971074Ca352FA706346c04C", // change to your address
      value: parseGwei('0.00001')
    }

  export default {
    name: "ActionButtonList",
    setup() {
      const { disconnect } = useDisconnect();
      const { open } = useAppKit();
      const networkData = useAppKitNetwork();
      const accountData = useAppKitAccount() 
      const { data: gas } = useEstimateGas({...TEST_TX}); // Wagmi hook to estimate gas
      const { data: hash, sendTransaction,error } = useSendTransaction(); // Wagmi hook to send a transaction
      const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message

  
      const address = accountData.value.address;
      const openAppKit = () => open();
      const switchToNetwork = () => networkData.value.switchNetwork(networks[1]);

      watchEffect(() => {
        if (hash.value) {
          console.log("tx hash:", hash.value);
        }
      });

      watchEffect(() => {
        if (error.value) {
          console.log("error:", error.value);
        }
      });

      const handleDisconnect = async () => {
          try {
            await disconnect();
          } catch (error) {
            console.error("Error during disconnect:", error);
          }
      };


      const handleSignMessage = async () => {
        console.log("sign Message")
        const msg = "Hello Reown AppKit!" // message to sign
        const sig = await signMessageAsync({ message: msg, account: address}); 
        console.log("signed message", sig);
      }

       // function to send a tx
      const handleSendTx = () => {
        console.log("send Tx")
        try {
          sendTransaction({
            ...TEST_TX,
            gas: gas.value // Add the gas to the transaction
          });
        } catch (err) {
          console.log('Error sending transaction:', err);
        }
      }


      return {
        handleDisconnect,
        openAppKit,
        switchToNetwork,
        handleSendTx,
        handleSignMessage,
        accountData,
        hash
      };
    },
  };
  </script>
  