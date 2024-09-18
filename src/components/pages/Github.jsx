import Article from '../common/ui/Article';
// import useAuthStore from '../../core/stores/useAuthStore'; // Zustand 스토어 import
import { supabase } from '../../core/api/supabase';

const Github = () => {
  console.log(supabase);
  // Zustand 스토어에서 필요한 함수와 상태 가져오기
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const loginWithGithub = useAuthStore((state) => state.loginWithGithub);

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
    } catch (error) {
      console.error('GitHub 로그인 에러:', error.message);
    }
  };

  return (
    <Article>
      <div>
        <button onClick={handleGithubLogin} disabled={isLoggedIn}>
          GitHub 로그인
        </button>
      </div>
    </Article>
  );
};

export default Github;
