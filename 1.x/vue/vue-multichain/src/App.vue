
<template>
   <div class="pages">
      <img src="/reown.svg" alt="Reown" width="150" height="150" />
      <h1>AppKit multichain vue Example</h1>

      <appkit-button />
      <ActionButtonList />
      <div className="advice">
        <p>
          This projectId only works on localhost. <br/>
          Go to <a href="https://dashboard.reown.com" target="_blank" className="link-button" rel="Reown Dashboard">Reown Dashboard</a> to get your own.
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