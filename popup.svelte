<script>
  import { exportTypes, LinkType, popupPageI18nValue } from "~utils/constants";
  import { exportSettings, feedbackHiddenSetting, welcomeHiddenSetting } from "~utils/store/stores";
  import Collepse from "~components/Collepse.svelte";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import LinkButton from "~components/LinkButton.svelte";

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
<!--collapse all Collepse by changing default_open to false-->
<div class="main">
  {#await Promise.all(promises)}
    <p>{popupPageI18nValue.WAITING}</p>
  {:then _}
    <!--TODO: 抽出组件-->
    <Collepse
      title={popupPageI18nValue.LINK_TITLE}
      default_open={true}
    >
      <LinkButton
        url="/tabs/chats.html"
        text={popupPageI18nValue.CHAT_RECORD_LINK}
        type={LinkType.INNER}
      />
      <LinkButton
        url="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx"
        text={popupPageI18nValue.BING_CHAT_LINK}
        type={LinkType.BING}
      />
      <LinkButton
        url="https://www.bing.com/new"
        text={popupPageI18nValue.BING_NEW_LINK}
        type={LinkType.BING}
      />
    </Collepse>
    <Collepse
      title={popupPageI18nValue.EXPORT_SETTINGS_TITLE}
      default_open={true}
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
      title={popupPageI18nValue.UI_SETTINGS_TITLE}
      default_open={true}
    >
      <div class="form-control">
        <SimpleCheckbox
          isChecked={welcomeHiddenSetting}
          text={popupPageI18nValue.HIDDEN_WELCOME}
        />
        <SimpleCheckbox
          isChecked={feedbackHiddenSetting}
          text={popupPageI18nValue.HIDDEN_FEEDBACK}
        />
      </div>
    </Collepse>
  {:catch err}
    <p>{err}</p>
  {/await}

</div>


