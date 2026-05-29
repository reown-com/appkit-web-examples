
<template>
   <div class="pages">
      <img src="/reown.svg" alt="Reown" width="150" height="150" />
      <h1>AppKit Vue + SIWX (Wagmi + Tron) Repro</h1>
      <p style="max-width: 640px; text-align: left; font-size: 14px;">
        Multi-adapter (Wagmi EVM + Tron) with <code>siwx.getRequired = () =&gt; true</code>.
        Trigger the bug by opening the modal, pairing MetaMask via WC, then dismissing the
        SIWX sign-message view by clicking outside / Escape / rejecting the signature.
        Reopen the modal — wallet buttons render but clicks are no-ops, and the next
        connection attempt logs
        <em>"Multi-namespace requests are not supported. Please request single namespace only."</em>
      </p>

      <appkit-button />
      <ActionButtonList />
      <div class="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://dashboard.reown.com" target="_blank" rel="noreferrer">Reown Dashboard</a> to get your own.
        </p>
      </div>
      <InfoList />
    </div>
</template>


<script>
import ActionButtonList from "./components/ActionButton.vue";
import InfoList from "./components/InfoList.vue";
import './config/index' // Ensure AppKit is initialized

export default {
  name: "App",
  components: {
    ActionButtonList,
    InfoList
  },
};
</script>