import { create } from 'zustand';

const useSlideOver = create((set) => ({
  isSearchVisible: false,
  toggleSearchVisibility: () => set((state) => ({ isSearchVisible: !state.isSearchVisible }))
}));

export default useSlideOver;
