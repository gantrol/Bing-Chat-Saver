<script>
  import DebugQuickButtons from "~components/popup/DebugQuickButtons.svelte";
  import TopLinks from "~components/popup/TopLinks.svelte";
  import ExportSettings from "~components/popup/ExportSettings.svelte";
  import UISettings from "~components/popup/UISettings.svelte";
  import RequestSettings from "~components/popup/RequestSettings.svelte";
  import Collapse from "~components/Collapse.svelte";
  import { popupPageI18nValue } from "~utils/constants";

  let debug = false;
  let activeTab = "export-setting-tab";

  const tabOnClick = (e) => {
    const tab_group = document.querySelector("#setting-tabs");
    tab_group.querySelector(".tab-active").classList.remove("tab-active");
    e.target.classList.add("tab-active");
    activeTab = e.target.id;
  };
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    div.main {
        min-width: 300px;
    }
</style>
<div class="main">
  {#if debug}
    <DebugQuickButtons />
  {/if}
  <TopLinks />
  <Collapse
    title={popupPageI18nValue.SETTINGS}
  >
    <div class="bg-base-200 border border-b-base-200 rounded-md">
      <div id="setting-tabs" class="tabs">
        <a class="tab tab-lifted tab-active" id="export-setting-tab"
           on:click={tabOnClick}>{popupPageI18nValue.EXPORT_SETTINGS_TITLE}</a>
        <a class="tab tab-lifted" id="ui-setting-tab" on:click={tabOnClick}>{popupPageI18nValue.UI_SETTINGS_TITLE}</a>
        <a class="tab tab-lifted" id="request-setting-tab" on:click={tabOnClick}>{popupPageI18nValue.REQUEST_SETTING}</a>
      </div>
      <div id="setting-tab-content" class="bg-base-100">
        <ExportSettings hidden={activeTab !== "export-setting-tab"} />
        <UISettings hidden={activeTab !== "ui-setting-tab"} />
        <RequestSettings hidden={activeTab !== "request-setting-tab"} />
      </div>
    </div>
  </Collapse>

</div>


