<script>
  export let isChecked;
  export let text;


</script>

<div class="input-group">
  <label class="label cursor-pointer">
    <input type="checkbox" bind:checked={$isChecked} class="checkbox checkbox-primary" />
  </label>
  <span class="label-text bg-base-100">{text}</span>
</div>
