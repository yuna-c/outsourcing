import { create } from 'zustand';

const useScrollStore = create((set) => ({
  isVisible: false,
  setIsVisible: (visible) => set({ isVisible: visible })
}));

export default useScrollStore;
