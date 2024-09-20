import { supabase } from '../instance/supabase';
import useAuthStore from '../stores/useAuthStore';

export const loginWithGithub = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:5173'
      }
    });

    if (error) {
      console.error('GitHub 로그인 에러:', error.message);
      return { success: false };
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('세션 가져오기 에러:', sessionError.message);
      return { success: false };
    }

    const session = sessionData.session;

    if (session) {
      const user = session.user;
      const setAuth = useAuthStore.getState().setAuth;
      setAuth(session.access_token, user.user_metadata.full_name, user.id, user.user_metadata.avatar_url);
      return { success: true, accessToken: session.access_token };
    }

    return { success: false };
  } catch (error) {
    console.error('GitHub 로그인 중 에러 발생:', error.message);
    return { success: false };
  }
};

export const loginWithKakao = async () => {
  try {
    const isKakaoInitialized = window.Kakao && window.Kakao.isInitialized();
    if (!isKakaoInitialized) {
      console.error('Kakao SDK가 초기화되지 않았습니다.');
      return { success: false };
    }

    return new Promise((resolve) => {
      window.Kakao.Auth.login({
        success: async (authObj) => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (response) => {
              const { id, properties } = response;
              const { nickname, profile_image } = properties;

              const setAuth = useAuthStore.getState().setAuth;
              setAuth(authObj.access_token, nickname, id, profile_image);

              resolve({ success: true, accessToken: authObj.access_token });
            },
            fail: (error) => {
              console.error('Kakao 사용자 정보 요청 실패:', error);
              resolve({ success: false });
            }
          });
        },
        fail: (error) => {
          console.error('Kakao 로그인 실패:', error);
          resolve({ success: false });
        }
      });
    });
  } catch (error) {
    console.error('Kakao 로그인 중 에러 발생:', error.message);
    return { success: false };
  }
};
