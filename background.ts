import rules from '~utils/request/header';


chrome.declarativeNetRequest.updateDynamicRules({
  // remove exist rules
  removeRuleIds: rules.map((rule) => rule.id),
  addRules: rules
});
