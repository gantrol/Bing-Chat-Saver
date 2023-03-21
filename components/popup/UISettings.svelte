<script>
  import { popupPageI18nValue } from "~utils/constants";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import {
    feedbackHiddenSetting,
    logoHiddenSetting,
    tuneHiddenSetting,
    welcomeHiddenSetting
  } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";
  export let hidden = false;

  let promises = [
    welcomeHiddenSetting.init(),
    feedbackHiddenSetting.init(),
    tuneHiddenSetting.init(),
    logoHiddenSetting.init(),
  ];
</script>

<PromiseWaiting {promises} {hidden}>
  <div class="form-control">
    <SimpleCheckbox
      isChecked={welcomeHiddenSetting}
      text={popupPageI18nValue.HIDDEN_WELCOME}
    />
    <SimpleCheckbox
      isChecked={logoHiddenSetting}
      text={popupPageI18nValue.HIDDEN_LOGO}
    />
    <SimpleCheckbox
      isChecked={tuneHiddenSetting}
      text={popupPageI18nValue.HIDDEN_TUNE}
    />
    <SimpleCheckbox
      isChecked={feedbackHiddenSetting}
      text={popupPageI18nValue.HIDDEN_FEEDBACK}
    />
  </div>
</PromiseWaiting>
