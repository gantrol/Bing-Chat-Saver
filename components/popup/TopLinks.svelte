<script>
  import Collapse from "~components/Collapse.svelte";
  import LinkButton from "~components/LinkButton.svelte";
  import { LinkType, popupPageI18nValue } from "~utils/constants";
</script>

<Collapse
  title={popupPageI18nValue.LINK_TITLE}
  default_open={true}
>
  <LinkButton
    url="/tabs/chats.html"
    text={popupPageI18nValue.CHAT_RECORD_LINK}
    type={LinkType.INNER}
  />

  <LinkButton
    url="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx"
    text={popupPageI18nValue.BING_CHAT_LINK}
    type={LinkType.BING}
  />
  <LinkButton
    url="https://www.bing.com/new"
    text={popupPageI18nValue.BING_NEW_LINK}
    type={LinkType.BING}
  />

</Collapse>
