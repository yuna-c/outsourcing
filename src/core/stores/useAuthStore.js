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

      // 객체 형태로 받아와야 함! 지금은 순서대로 받고 있어서 무조건 요 순서를 지켜서 넣어줘야함 예..
      // setAuth: ({accessToken, nickname, userId, avatar})
      setAuth: (accessToken, nickname, userId, avatar) => {
        console.log('setAuth 호출됨:', { accessToken, nickname, userId, avatar });
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
