<script>
  export let bind_value;
  export let keys;
  export let values;
</script>

<select
  class="select"
  bind:value="{bind_value}">
  {#each Object.keys(keys) as key}
    <option value={keys[key]}>
      {values[key]}
    </option>
  {/each}
</select>
