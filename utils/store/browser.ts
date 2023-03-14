import { writable } from "svelte/store";
import { Storage } from "@plasmohq/storage";

export const browserSyncStorage = <T>(key: string, initial: T) => {
  const { subscribe, set, update } = writable<T>(initial);
  const storage = new Storage();

  storage.watch({
    key: (c) => {
      console.log(c.newValue);
    },
  })
  return {
    subscribe,
    set: async (value: T) => {
      await storage.set(key, value)
      return set(value);
    },
    update,
    init: async () => {
      const result = await storage.get<T>(key);
      if (result === null || result === undefined) {
        await storage.set(key, initial);
      }
      const saved = await storage.get<T>(key);
      set(saved);
    },
    get: async () => {
      return await storage.get<T>(key)
    }
  };
};


export const browserSyncGet = async <T>(key: string) => {
  const storage = new Storage();
  const result = await storage.get<T>(key);
  console.log(`browserSyncGet: ${key}`);
  console.log(result);
  return await storage.get<T>(key);
};
export const browserSyncSet = async <T>(key: string, value: T) => {
  const storage = new Storage();
  return await storage.set(key, value);
  // const setObj = {};
  // setObj[key] = value;
  // await chrome.storage.sync.set(setObj);
};
