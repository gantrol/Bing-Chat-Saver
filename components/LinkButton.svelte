<script>

  export let url;
  export let text;
  export let type = 'inner';

  import { getText } from "~utils/i18n";

  const handleClassByType = (type) => {
    if (type === 'bing') {
      return 'btn-secondary'
    } else if (type === 'inner') {
      return 'btn-primary'
    } else {
      return ''
    }
  }
</script>

<button class="btn {handleClassByType(type)}" on:click={() => {
        chrome.tabs.create({
          url: url
        })
      }}>
  {getText(text)}
</button>
