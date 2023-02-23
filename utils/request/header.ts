const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

const rules: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: 'X-Forwarded-For',
          value: '1.36.8.9',
        }
      ]



    },
    condition: {
      urlFilter: 'bing.com',
      resourceTypes: allResourceTypes,
    }
  },

];

export default rules;
