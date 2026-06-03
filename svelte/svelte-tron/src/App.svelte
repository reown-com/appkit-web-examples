<script>
  import ActionButtonList from './lib/ActionButtonList.svelte'
  import InfoList from './lib/InfoList.svelte'
</script>

<div class="pages">
  <img src="/reown.svg" alt="Reown" style="width: 150px; height: 150px" />
  <h1>AppKit Tron Svelte Example</h1>

  <appkit-button></appkit-button>

  <ActionButtonList />

  <div class="advice">
    <p>
      This projectId only works on localhost. <br />
      Go to
      <a
        href="https://dashboard.reown.com"
        target="_blank"
        class="link-button"
        rel="noopener noreferrer">Reown Dashboard</a
      > to get your own.
    </p>
  </div>

  <InfoList />
</div>
