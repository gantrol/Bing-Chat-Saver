<script>
  import { exportTypes } from "~utils/constants";
  import { exportSettings, feedbackHiddenSetting, welcomeHiddenSetting } from "~utils/store/stores";
  import Collepse from "~components/Collepse.svelte";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";


  let promises = [
    exportSettings.init(),
    welcomeHiddenSetting.init(),
    feedbackHiddenSetting.init()
  ];
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    div.main {
        min-width: 300px;
        font-size: 15px;
    }

</style>
<div class="main">
  {#await Promise.all(promises)}
    <p>Waiting...</p>
  {:then _}
    <!--TODO: 抽出组件-->
    <Collepse
      title="Links"
      default_open="true"
    >
      <button class="btn btn-primary" on:click={() => {
        chrome.tabs.create({
          url: '/tabs/chats.html'
        })
      }}>
        Chat Record
      </button>
      <button class="btn btn-secondary" on:click={() => {
        chrome.tabs.create({
          url: 'https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx'
        })
      }}>Bing Chat
      </button>
    </Collepse>
    <Collepse
      title="Export Setting"
      default_open="true"
    >
      {#each $exportSettings as message, i}
        <div class="form-control">
          <div class="input-group">
            <label class="label cursor-pointer">
              <input type="checkbox" bind:checked={message.on} class="checkbox checkbox-primary" />
            </label>
            <select
              class="select"
              bind:value="{message.type}">
              {#each Object.keys(exportTypes) as key}
                <option value={exportTypes[key]}>
                  {exportTypes[key]}
                </option>
              {/each}
            </select>
          </div>
        </div>
      {/each}
    </Collepse>
    <Collepse
      title="UI Settings"
      default_open="true"
    >
      <div class="form-control">
        <SimpleCheckbox
          isChecked={welcomeHiddenSetting}
          text="Hide welcome bar"
        />
        <SimpleCheckbox
          isChecked={feedbackHiddenSetting}
          text="Hide feedback button"
        />
      </div>
    </Collepse>
  {:catch err}
    <p>{err}</p>
  {/await}

</div>


