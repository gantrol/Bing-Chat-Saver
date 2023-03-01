<script>
  import Collapse from "~components/Collapse.svelte";
  import LinkButton from "~components/LinkButton.svelte";
  import { LinkType, Messages, popupPageI18nValue } from "~utils/constants";
</script>

<Collapse
  title="debug Tools"
  default_open={true}
>
  <button class="btn" on:click={async () => {
          let prev_size;
          const size = await chrome.runtime.sendMessage({
            type: Messages.GET_WINDOW_SIZE
          });
          console.log(size)

          prev_size = {...size};
          size.width = 375;
          size.state = 'normal';
          const response = await chrome.runtime.sendMessage({
            type: Messages.RESIZE_WINDOW,
            body: size
          });
          console.log(response)
          console.log(prev_size)
          chrome.runtime.sendMessage({
            type: Messages.RESIZE_WINDOW_2,
            body: prev_size
          }).catch((error) => {
            console.error(error);
          })
      }}>
    RESIZE
  </button>
  <LinkButton
    url="https://www.bing.com/search?q=I%20need%20to%20throw%20a%20dinner%20party%20for%206%20people%20who%20are%20vegetarian.%20Can%20you%20suggest%20a%203-course%20menu%20with%20a%20chocolate%20dessert?&iscopilotedu=1&form=MA13G7"
    text={popupPageI18nValue.BING_DEMO_LINK}
    type={LinkType.BING}
  />
</Collapse>
