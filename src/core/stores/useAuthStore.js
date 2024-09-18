import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      avatar: null,
      nickname: null,
      success: false,
      userId: null,
      isLoggedIn: false,

      setAccessToken: (accessToken) => set({ accessToken }),
      setAvatar: (avatar) => set({ avatar }),
      setNickname: (nickname) => set({ nickname }),
      setSuccess: (success) => set({ success }),
      setUserId: (userId) => set({ userId }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

      setAuth: (accessToken, nickname, userId, avatar) => {
        set({
          accessToken,
          nickname,
          userId,
          avatar,
          isLoggedIn: true,
          success: true
        });
      },

      clearAuth: () => {
        set({
          accessToken: null,
          avatar: null,
          nickname: null,
          success: false,
          userId: null,
          isLoggedIn: false
        });
      }
    }),
    {
      name: 'authStorage',
      getStorage: () => localStorage
    }
  )
);

export default useAuthStore;
