import { supabase } from './supabase';
import useAuthStore from '../stores/useAuthStore';

export const loginWithGithub = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:5173'
      }
    });

    if (error) {
      console.error('GitHub 로그인 에러:', error.message);
      return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('세션 가져오기 에러:', sessionError.message);
      return;
    }

    const session = sessionData.session;

    if (session) {
      const user = session.user;
      const setAuth = useAuthStore.getState().setAuth;
      setAuth(session.access_token, user.user_metadata.full_name, user.id, user.user_metadata.avatar_url);
    }
  } catch (error) {
    console.error('GitHub 로그인 중 에러 발생:', error.message);
  }
};
