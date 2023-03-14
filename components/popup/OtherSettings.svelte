<script>
  import { popupPageI18nValue } from "~utils/constants";
  import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
  import { isDebugModeSetting } from "~utils/store/stores";
  import PromiseWaiting from "~components/PromiseWaiting.svelte";
  export let hidden = false;

  let promises = [
    isDebugModeSetting.init(),
  ];
</script>

<PromiseWaiting {promises} {hidden}>
  <div class="form-control">
    <SimpleCheckbox
      isChecked={isDebugModeSetting}
      text={popupPageI18nValue.isDebugModeSetting}
    />
  </div>
</PromiseWaiting>
