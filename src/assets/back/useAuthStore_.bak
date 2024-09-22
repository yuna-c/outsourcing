import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { supabase } from '../instance/supabase';

const useAuthStore = create(
  persist(
    (set) => ({
      // 사용자 정보와 상태
      user: null,
      accessToken: null,
      avatar: null,
      nickname: null,
      success: false,
      userId: null,
      isLoggedIn: false,

      // 사용자 상태 설정 메서드
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setAvatar: (avatar) => set({ avatar }),
      setNickname: (nickname) => set({ nickname }),
      setSuccess: (success) => set({ success }),
      setUserId: (userId) => set({ userId }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

      // 사용자 인증 정보 설정
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

      // 사용자 인증 정보 초기화
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          avatar: null,
          nickname: null,
          success: false,
          userId: null,
          isLoggedIn: false
        });
        // localStorage.removeItem('authStorage');
      }

      // 세션을 가져오고 사용자 상태를 설정
      // getSession: async () => {
      //   const {
      //     data: { session }
      //   } = await supabase.auth.getSession();
      //   set({
      //     user: session?.user ?? null,
      //     accessToken: session?.access_token ?? null,
      //     isLoggedIn: !!session?.user
      //   });
      // },

      // 인증 상태 변경을 구독
      // subscribeToAuthChanges: () => {
      //   const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      //     set({
      //       user: session?.user ?? null,
      //       accessToken: session?.access_token ?? null,
      //       isLoggedIn: !!session?.user
      //     });
      //   });

      //   return () => {
      //     authListener.subscription.unsubscribe();
      //   };
      // },
    }),
    {
      name: 'authStorage', // 로컬 스토리지 키
      getStorage: () => localStorage // 로컬 스토리지 사용
    }
  )
);

export default useAuthStore;
