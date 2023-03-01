<script>
  import { popupPageI18nValue } from "~utils/constants";

  export let promises;
</script>

{#await Promise.all(promises)}
  <p>{popupPageI18nValue.WAITING}</p>
{:then _}
  <slot></slot>
{:catch err}
  <p>{err}</p>
{/await}
