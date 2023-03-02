<script>
  export let title;
  export let default_open = true;

</script>


<div tabindex="0"
     class="collapse collapse-arrow border bg-base-100">
  <input type="checkbox" bind:checked={default_open} />
  <div class="collapse-title text-lg font-medium">
    {title}
  </div>
  <div class="collapse-content">
    <slot />
  </div>
</div>
