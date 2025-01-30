import { create } from "zustand";

const useAccountStore = create((set) => ({
  account: undefined,
  setAccount: (account) => {
    set({ account });
  }
}));

export { useAccountStore };
