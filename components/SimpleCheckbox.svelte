<script>
  export let isChecked;
  export let text;

  import { getText } from "~utils/i18n";

</script>

<div class="input-group">
  <label class="label cursor-pointer">
    <input type="checkbox" bind:checked={$isChecked} class="checkbox checkbox-primary" />
  </label>
  <span class="label-text bg-base-100">{getText(text)}</span>
</div>
