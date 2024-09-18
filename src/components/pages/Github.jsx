import Article from '../common/ui/Article';
import { loginWithGithub } from '../../core/api/socialAuth';
import { supabase } from '../../core/api/supabase';
import useAuthStore from '../../core/stores/useAuthStore';

import Button from '../common/ui/Button';
import { useNavigate } from 'react-router-dom';

const Github = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuth = useAuthStore((state) => state.setAuth);

  const onHandleGithubLogin = async () => {
    try {
      // GitHub 로그인 실행
      await loginWithGithub();

      // GitHub 로그인이 완료되면 세션을 확인하고 상태 업데이트
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (session) {
        const user = session.user;
        setAuth(session.access_token, user.user_metadata.full_name, user.id, user.user_metadata.avatar_url);
        alert('GitHub 로그인 성공');
        navigate('/');
      } else {
        alert('GitHub 로그인 실패');
      }
    } catch (error) {
      console.error('GitHub 로그인 에러:', error.message);
      alert('GitHub 로그인 중 에러가 발생했습니다.');
    }
  };

  return (
    <Article className="w-full xl:w-xl-1/2-important">
      <Button onClick={onHandleGithubLogin} disabled={isLoggedIn} className="w-full p-2">
        GitHub 로그인
      </Button>
    </Article>
  );
};

export default Github;
