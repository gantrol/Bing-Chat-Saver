import { writable } from "svelte/store";


export const chromeSyncStorage = <T>(key: string, initial: T) => {
  const { subscribe, set, update } = writable<T>(initial);

  return {
    subscribe,
    set: (value: T) => {
      chromeSyncSet(key, value)
      return set(value);
    },
    update,
    init: async () => {
      const result = await chromeSyncGet(key);
      if (result === null || result === undefined) {
        await chromeSyncSet(key, initial);
      }
      const saved = await chromeSyncGet(key);
      set(saved);
    }
  };
};

export const chromeSyncGet = async (key: string) => {
  const obj = await chrome.storage.sync.get([key]);
  return obj[key];
};

export const chromeSyncSet = async <T>(key: string, value: T) => {
  const setObj = {};
  setObj[key] = value;
  await chrome.storage.sync.set(setObj);
};
