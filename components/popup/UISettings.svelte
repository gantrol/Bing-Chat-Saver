<script>
  import { popupPageI18nValue } from "~utils/constants";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import { feedbackHiddenSetting, welcomeHiddenSetting } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";
  export let hidden = false;

  let promises = [
    welcomeHiddenSetting.init(),
    feedbackHiddenSetting.init(),
  ];
</script>

<PromiseWaiting {promises} {hidden}>
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
</PromiseWaiting>
