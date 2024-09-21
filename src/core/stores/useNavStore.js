import { create } from 'zustand';

const useNavStore = create((set) => ({
  isOpen: false,
  isScrolled: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsScrolled: (isScrolled) => set({ isScrolled })
}));

export default useNavStore;
