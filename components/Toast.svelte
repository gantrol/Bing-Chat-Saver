<script>
  import { fly } from "svelte/transition";
  export let message = "";
</script>

<div
  in:fly={{ y: -20, duration: 300 }}
  out:fly={{ y: -20, duration: 300 }}
  class="toast"
>
  <div class="alert alert-info">
    <span>{message}</span>
  </div>
</div>
