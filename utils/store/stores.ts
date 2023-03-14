import { exportTypes, exportWidthTemplateKeys, Settings } from "~utils/constants";
import {  browserSyncStorage } from "~utils/store/browser";

const defaultSize = 375;

export const defaultNewExportSetting = { on: true, size: defaultSize, size_template: exportWidthTemplateKeys.AS_SEEN, type: exportTypes.PNG };
export const defaultExportSettings = [
  { id: 1, ...defaultNewExportSetting},
  { id: 2, on: false, size: defaultSize, size_template: exportWidthTemplateKeys.AS_SEEN, type: exportTypes.JPG },
  { id: 3, on: false, type: exportTypes.MD },
  { id: 4, on: false, type: exportTypes.JSON }
];

export const exportSettings = browserSyncStorage(Settings.EXPORT, defaultExportSettings);

export const welcomeHiddenSetting =  browserSyncStorage(Settings.WELCOME, true);
export const feedbackHiddenSetting =  browserSyncStorage(Settings.FEEDBACK, false);

export const requestIpSetting =  browserSyncStorage(Settings.REQUEST_IP, false);
export const requestSetting =  browserSyncStorage(Settings.REQUEST, { ip: false, ua: true });

export const requestUserAgentSetting =  browserSyncStorage(Settings.REQUEST_UA, true);

export const isDebugModeSetting = browserSyncStorage(Settings.debug, false);
