<script>
  import Collapse from "~components/Collapse.svelte";
  import { exportSettingsI18nValue, exportTypes, exportWidthTemplateKeys, popupPageI18nValue } from "~utils/constants";
  import { exportSettings } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";

  let promises = [
    exportSettings.init(),
  ];

</script>

<PromiseWaiting {promises}>
<Collapse
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
        <select
          class="select"
          bind:value="{message.size_template}">
          {#each Object.keys(exportWidthTemplateKeys) as key}
            <option value={exportWidthTemplateKeys[key]}>
              {exportSettingsI18nValue[key]}
            </option>
          {/each}
        </select>

        <!--        <SimpleSelect-->
<!--          bind:bind_value="{message.size_template}"-->
<!--          keys={exportWidthTemplateKeys}-->
<!--          values={exportSettingsI18nValue}-->
<!--        />-->
      </div>
    </div>
  {/each}
</Collapse>
</PromiseWaiting>

