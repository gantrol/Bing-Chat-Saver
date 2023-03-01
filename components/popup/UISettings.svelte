<script>
  import Collapse from "~components/Collapse.svelte";
  import { popupPageI18nValue } from "~utils/constants";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import { feedbackHiddenSetting, welcomeHiddenSetting } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";

  let promises = [
    welcomeHiddenSetting.init(),
    feedbackHiddenSetting.init(),
  ];
</script>

<PromiseWaiting {promises}>
<Collapse
  title={popupPageI18nValue.UI_SETTINGS_TITLE}
  default_open={true}
>
  <div class="form-control">
    <SimpleCheckbox
      isChecked={welcomeHiddenSetting}
      text={popupPageI18nValue.HIDDEN_WELCOME}
    />
    <SimpleCheckbox
      isChecked={feedbackHiddenSetting}
      text={popupPageI18nValue.HIDDEN_FEEDBACK}
    />
  </div>
</Collapse>
</PromiseWaiting>
