import Article from '../common/ui/Article';
import { loginWithGithub } from '../../core/api/socialAuth';
import useAuthStore from '../../core/stores/useAuthStore';

import Button from '../common/ui/Button';

const Github = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const onHandleGithubLogin = async () => {
    try {
      await loginWithGithub();
    } catch (error) {
      console.error('GitHub 로그인 에러:', error.message);
    }
  };

  return (
    <Article>
      <Button onClick={onHandleGithubLogin} disabled={isLoggedIn} className="w-full p-2">
        GitHub 로그인
      </Button>
    </Article>
  );
};

export default Github;
