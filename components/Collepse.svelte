<script>
  export let title;
  export let default_open = true;

</script>


<div tabindex="0"
     class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <input type="checkbox" bind:checked={default_open} />
  <div class="collapse-title text-xl font-medium">
    {title}
  </div>
  <div class="collapse-content">
    <slot />
  </div>
</div>
