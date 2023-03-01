<script>
  import Collapse from "~components/Collapse.svelte";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import { popupPageI18nValue } from "~utils/constants";
  import { requestIpSetting, requestUserAgentSetting } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";
  let promises = [
    requestIpSetting.init(),
    requestUserAgentSetting.init(),
  ];
</script>

<PromiseWaiting {promises}>
<Collapse
  title={popupPageI18nValue.REQUEST_SETTING}
  default_open={true}
>
  <div class="form-control">
    <SimpleCheckbox
      isChecked={requestUserAgentSetting}
      text={popupPageI18nValue.REQUEST_BROWSER}
    />
    <!--TODO: ADD self config ip-->
    <SimpleCheckbox
      isChecked={requestIpSetting}
      text={popupPageI18nValue.REQUEST_IP}
    />
  </div>
</Collapse>
</PromiseWaiting>
