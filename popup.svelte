<script>
  import { exportTypes } from "~utils/constants";
  import { exportSettings, feedbackHiddenSetting, welcomeHiddenSetting } from "~utils/store/stores";

  let promises = [
    exportSettings.init(),
    welcomeHiddenSetting.init(),
    feedbackHiddenSetting.init(),
  ];
</script>

<div>
  {#await Promise.all(promises)}
    <p>Waiting...</p>
  {:then _}
    <h3>ExportSettings</h3>
    <form id="exportSettings">
<!--      TODO: a table? Or copy figma?-->
      {#each $exportSettings as message, i}
        <div>
          <input type="checkbox" bind:checked={message.on}>
<!--          <input type="number" min="200" max="3000" bind:value={message.size}>-->
          <select
            bind:value="{message.type}">
            {#each Object.keys(exportTypes) as key}
              <option value={exportTypes[key]}>
                {exportTypes[key]}
              </option>
            {/each}
          </select>
        </div>
      {/each}
    </form>
    <h3>UI Settings</h3>
    <form id="welcome-hidden-setting">
      <div>
        <input type="checkbox" bind:checked={$welcomeHiddenSetting}>
        Hide welcome bar
      </div>
    </form>
    <form id="feedback-hidden-setting">
      <div>
        <input type="checkbox" bind:checked={$feedbackHiddenSetting}>
        Hide feedback button
      </div>
    </form>
    {:catch err}
    <p>{err}</p>
  {/await}
</div>

<style>
    div {
        min-width: 300px;
        font-size: 15px;
    }

    input {
        margin: 5px;
        outline: none;
    }
</style>


