const getText = chrome.i18n.getMessage;


interface exportSettingsInterface {

  AS_SEEN,
  MOBILE,
  PNG,
  JPG,
  MD,
  JSON,
  PDF,
}

interface exportActionsInterface {
  ALL,
  PREVIEW,
}


const exportSettingsI18nKeys: exportSettingsInterface = {
  AS_SEEN: "popup_export_type_as_seen",
  MOBILE: "popup_export_type_mobile",
  PNG: "popup_export_type_png",
  PDF: "popup_export_type_pdf",
  JPG: "popup_export_type_jpg",
  MD: "popup_export_type_markdown",
  JSON: "popup_export_type_json"
};

const exportActionsI18nKeys: exportActionsInterface = {
  ALL: "content_export_all_button",
  PREVIEW: "content_preview_button"
};

/**
 * @description Settings for chrome sync storage
 */
export const Settings = {
  debug: "setting_debug",
  WELCOME: "welcome-settings",
  FEEDBACK: "feedback-settings",
  LOGO: "logo-appear-settings",
  TONE: "tune-settings",
  REQUEST: "request-settings",
  REQUEST_UA: "request-ua-settings",
  REQUEST_IP: "request-ip-settings",
  EXPORT: "export-settings"
};

/**
 * @description Messages for communication between background and popup
 */
export const Messages = {
  SAVE_CHAT: "save-chat",
  RESIZE_WINDOW: "resize-window",
  GET_WINDOW_SIZE: "get-window-size",
  GET_WINDOW_STATE: "get-window-state",
  RESIZE_WINDOW_2: "resize-window-2",
};

export const LinkType = {
  BING: "bing",
  INNER: "inner"
};

/**
 * @description Popup page i18n key
 */
const popupPageI18nKey = {
  EXPORT_SETTINGS_TITLE: "popup_export_settings_title",
  UI_SETTINGS_TITLE: "popup_ui_settings_title",
  REQUEST_SETTING: "popup_request_setting",
  OTHER_SETTINGS_TITLE: "popup_other_settings_title",
  LINK_TITLE: "popup_link_title",
  CHAT_RECORD_LINK: "popup_chat_record_button",
  BING_CHAT_LINK: "popup_bing_chat_website_button",
  BING_NEW_LINK: "popup_bing_new_website_button",
  BING_DEMO_LINK: "popup_bing_demo_website_button",
  HIDDEN_WELCOME: "popup_hidden_welcome",
  HIDDEN_FEEDBACK: "popup_hidden_feedback",
  HIDDEN_LOGO: "popup_hidden_logo",
  HIDDEN_TUNE: "popup_hidden_tone",
  REQUEST_BROWSER: "popup_request_browser",
  REQUEST_IP: "popup_request_ip",
  SETTINGS: "popup_settings",
  isDebugModeSetting: "setting_debug",
  WAITING: "popup_waiting"
};


const objectMap = (object, map) => {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = map(object[key]);
    return result;
  }, {});
};

export const exportActions = <exportActionsInterface>objectMap(exportActionsI18nKeys, getText);
export const exportTypes = {
  PNG: "PNG",
  // PDF: "PDF",
  JPG: "JPG",
  MD: "Markdown",
  JSON: "JSON"
};

export const exportWidthTemplateKeys = {
  AS_SEEN: "AS_SEEN",
  MOBILE: "MOBILE"
}
export const exportSettingsI18nValue = objectMap(exportSettingsI18nKeys, getText);
export const popupPageI18nValue = objectMap(popupPageI18nKey, getText);
