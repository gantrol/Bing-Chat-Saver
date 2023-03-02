<script>
  import { exportSettingsI18nValue, exportTypes, exportWidthTemplateKeys } from "~utils/constants";
  import { exportSettings } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";
  import SimpleSelect from "~components/SimpleSelect.svelte";
  export let hidden = false;

  let promises = [
    exportSettings.init(),
  ];

</script>

<PromiseWaiting {promises} {hidden}>
  {#each $exportSettings as message, i}
    <div class="form-control">
      <div class="input-group">
        <label class="label cursor-pointer">
          <input type="checkbox" bind:checked={message.on} class="checkbox checkbox-primary checkbox-xs" />
        </label>
        <SimpleSelect
          bind:bind_value="{message.type}"
          keys={exportTypes}
          values={exportSettingsI18nValue}
        />
        <SimpleSelect
          bind:bind_value="{message.size_template}"
          keys={exportWidthTemplateKeys}
          values={exportSettingsI18nValue}
        />
      </div>
    </div>
  {/each}
</PromiseWaiting>

