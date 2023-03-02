import { exportTypes, exportWidthTemplateKeys, Settings } from "~utils/constants";
import { chromeSyncStorage } from "~utils/store/chrome";

const defaultSize = 375;

const defaultNewExportSetting = { on: true, size: defaultSize, size_template: exportWidthTemplateKeys.AS_SEEN, type: exportTypes.PNG };
const defaultExportSettings = [
  { id: 1, ...defaultNewExportSetting},
  { id: 2, on: false, size: defaultSize, size_template: exportWidthTemplateKeys.AS_SEEN, type: exportTypes.JPG },
  { id: 3, on: false, type: exportTypes.MD },
  { id: 4, on: false, type: exportTypes.JSON }
];

export const exportSettings = chromeSyncStorage(Settings.EXPORT, defaultExportSettings);

export const welcomeHiddenSetting =  chromeSyncStorage(Settings.WELCOME, true);
export const feedbackHiddenSetting =  chromeSyncStorage(Settings.FEEDBACK, false);

export const requestIpSetting =  chromeSyncStorage(Settings.REQUEST_IP, false);
export const requestSetting =  chromeSyncStorage(Settings.REQUEST, { ip: false, ua: true });

export const requestUserAgentSetting =  chromeSyncStorage(Settings.REQUEST_UA, true);
