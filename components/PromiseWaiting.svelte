<script>
  export let promises;
  export let hidden = false;
</script>

<div class:hidden={hidden}>
  {#await Promise.all(promises)}
    <progress class="progress w-56"></progress>
  {:then _}
    <slot></slot>
  {:catch err}
    <p>{err}</p>
  {/await}
</div>

