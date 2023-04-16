import { writable } from "svelte/store";

const createToastStore = () => {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    showToast: (message, duration = 3000) => {
      const id = Date.now();

      update((toasts) => [
        ...toasts,
        {
          id,
          message,
        },
      ]);

      setTimeout(() => {
        update((toasts) => toasts.filter((t) => t.id !== id));
      }, duration);
    },
  };
};

export const toastStore = createToastStore();
