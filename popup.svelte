<script>
  import DebugQuickButtons from "~components/popup/DebugQuickButtons.svelte";
  import TopLinks from "~components/popup/TopLinks.svelte";
  import ExportSettings from "~components/popup/ExportSettings.svelte";
  import UISettings from "~components/popup/UISettings.svelte";
  import RequestSettings from "~components/popup/RequestSettings.svelte";

  let debug = false;
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    div.main {
        min-width: 300px;
    }
</style>
<!--collapse all Collepse by changing default_open to false-->
<!--TODO: font_size-- ?-->
<!--TODO: 大小自适应-->
<div class="main">
  {#if debug}
    <DebugQuickButtons />
  {/if}
  <TopLinks />
  <ExportSettings />
  <UISettings />
  <RequestSettings />
</div>


