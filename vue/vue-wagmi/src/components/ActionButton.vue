<template>
    <div>
      <div v-if="accountData.isConnected">
        <button @click="handleDisconnect">Disconnect</button>
        <button @click="switchToNetwork">Switch</button>
        <button @click="handleSendTx">Send a Transaction</button>

        <div v-if="hash">Transaction Hash: {{ hash }}</div>
      </div>
      <button v-else @click="openAppKit">Open</button>
    </div>
  </template>
  
  <script>
  import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount } from "@reown/appkit/vue";
  import { networks } from "../config/index";
  import { useEstimateGas, useSendTransaction } from '@wagmi/vue'
  import { parseGwei } from 'viem'
  
      // test transaction
      const TEST_TX = {
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // vitalik address
      value: parseGwei('0.0001')
    }

  export default {
    name: "ActionButtonList",
    setup() {
      const { disconnect } = useDisconnect();
      const { open } = useAppKit();
      const networkData = useAppKitNetwork();
      const accountData = useAppKitAccount() 
      const { data: gas } = useEstimateGas({...TEST_TX}); // Wagmi hook to estimate gas
      const { data: hash, sendTransaction } = useSendTransaction(); // Wagmi hook to send a transaction
  
    
      const openAppKit = () => open();
      const switchToNetwork = () => networkData.value.switchNetwork(networks[1]);
      const handleDisconnect = async () => {
          try {
            await disconnect();
          } catch (error) {
            console.error("Error during disconnect:", error);
          }
      };



       // function to send a tx
    const handleSendTx = () => {
      console.log("1")
      try {
        sendTransaction({
          ...TEST_TX,
          gas // Add the gas to the transaction
        });
        console.log("2")
      } catch (err) {
        console.log('Error sending transaction:', err);
      }
    }


      return {
        handleDisconnect,
        openAppKit,
        switchToNetwork,
        handleSendTx,
        accountData
      };
    },
  };
  </script>
  