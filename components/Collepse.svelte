<script>
  export let title;
  export let default_open = true;
  import { getText } from "~utils/i18n";

</script>


<div tabindex="0"
     class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <input type="checkbox" bind:checked={default_open}/>
  <div class="collapse-title text-xl font-medium">
    {getText(title)}
  </div>
  <div class="collapse-content">
    <slot/>
  </div>
</div>
