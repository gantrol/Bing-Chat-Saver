import { writable } from 'svelte/store'
import type { JsonValue } from '~utils/types/json.type'

// from: https://svelte.dev/repl/d78d7327830442ab87cc47bcee1033f9?version=3.43.1
export const localStore = <T extends JsonValue>(key: string, initial: T) => {          // receives the key of the local storage and an initial value
  const toString = (value: T) => JSON.stringify(value, null, 2)           // helper function
  const toObj = JSON.parse                                                // helper function

  if (localStorage.getItem(key) === null) {                               // item not present in local storage
    localStorage.setItem(key, toString(initial))                          // initialize local storage with initial value
  }

  const saved = toObj(localStorage.getItem(key))                          // convert to object

  const { subscribe, set, update } = writable<T>(saved)                   // create the underlying writable store

  return {
    subscribe,
    set: (value: T) => {
      localStorage.setItem(key, toString(value))                          // save also to local storage as a string
      return set(value)
    },
    update
  }
}
