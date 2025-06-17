import { create } from "zustand";

export const useDeleteItems = create((set) => ({
  deleteItem: false,
  setDeleteItem: (value) => set({ deleteItem: value }),
  toggleDeleteItem: () => set((state) => ({ deleteItem: !state.deleteItem })),
}));