const getText = chrome.i18n.getMessage;


interface exportTypesInterface {
  PNG,
  JPG,
  MD,
  JSON,
}

interface exportActionsInterface {
  ALL,
  PREVIEW,
}

const exportTypesI18nKeys: exportTypesInterface = {
  PNG: "popup_export_type_png",
  JPG: "popup_export_type_jpg",
  MD: "popup_export_type_markdown",
  JSON: "popup_export_type_json",
}

const exportActionsI18nKeys: exportActionsInterface = {
  ALL: 'content_export_all_button',
  PREVIEW: 'content_preview_button',
}

/**
 * @description Settings for chrome sync storage
 */
export const Settings = {
  WELCOME: "welcome-settings",
  FEEDBACK: "feedback-settings",
  EXPORT: "export-settings",
}

/**
 * @description Messages for communication between background and popup
 */
export const Messages = {
  SAVE_CHAT: "save-chat",
}

export const LinkType = {
  BING: "bing",
  INNER: "inner",
}

/**
 * @description Popup page i18n key
 */
const popupPageI18nKey = {
  EXPORT_SETTINGS_TITLE: "popup_export_settings_title",
  UI_SETTINGS_TITLE: "popup_ui_settings_title",
  LINK_TITLE: "popup_link_title",
  CHAT_RECORD_LINK: "popup_chat_record_button",
  BING_CHAT_LINK: "popup_bing_chat_website_button",
  BING_NEW_LINK: "popup_bing_new_website_button",
  HIDDEN_WELCOME: "popup_hidden_welcome",
  HIDDEN_FEEDBACK: "popup_hidden_feedback",
  WAITING: "popup_waiting",
}


const objectMap = (object, map) => {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = map(object[key])
    return result
  }, {})
}

export const exportActions = <exportActionsInterface>objectMap(exportActionsI18nKeys, getText);
export const exportTypes = <exportTypesInterface>objectMap(exportTypesI18nKeys, getText);
export const popupPageI18nValue = objectMap(popupPageI18nKey, getText);
