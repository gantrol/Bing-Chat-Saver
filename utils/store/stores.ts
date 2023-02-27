import { exportTypes, Settings } from "~utils/constants";
import { chromeSyncStorage } from "~utils/store/chrome";

const defaultSize = 300;

const defaultNewExportSetting = { on: true, size: defaultSize, type: exportTypes.PNG };
const defaultExportSettings = [
  { id: 1, ...defaultNewExportSetting},
  { id: 2, on: false, size: defaultSize, type: exportTypes.JPG },
  { id: 3, on: false, size: defaultSize, type: exportTypes.MD },
  { id: 4, on: false, size: defaultSize, type: exportTypes.JSON }
];


// export const exportSettings = localStore("export-settings", defaultExportSettings);
export const exportSettings = chromeSyncStorage(Settings.EXPORT, defaultExportSettings);

export const welcomeHiddenSetting =  chromeSyncStorage(Settings.WELCOME, true);
export const feedbackHiddenSetting =  chromeSyncStorage(Settings.FEEDBACK, false);
