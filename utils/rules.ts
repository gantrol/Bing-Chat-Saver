const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

export const ip_rule: chrome.declarativeNetRequest.Rule =
  {
    id: 2,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: "X-Forwarded-For",
          // TODO: configurable
          value: "1.36.8.9"
        }
      ]
    },
    condition: {
      urlFilter: "bing.com",
      resourceTypes: allResourceTypes
    }
  };


export const ua_rule: chrome.declarativeNetRequest.Rule =
  {
    id: 3,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: "User-Agent",
          value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.56"
        }
      ]
    },
    condition: {
      urlFilter: "bing.com",
      resourceTypes: allResourceTypes
    }
  };
