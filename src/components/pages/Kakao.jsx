import { useEffect } from 'react';
import { loginWithKakao } from '../../core/api/socialAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../common/ui/Button';
import Article from '../common/ui/Article';

const Kakao = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAOLOGIN_KEY);
    }
  }, []);

  const onHandleKakaoLogin = async () => {
    const { success } = await loginWithKakao();

    if (success) {
      alert('Kakao 로그인 성공');
      navigate('/');
    } else {
      alert('Kakao 로그인에 실패했습니다.');
    }
  };

  return (
    <Article className="w-full xl:w-xl-1/2-important">
      <Button onClick={onHandleKakaoLogin} className="w-full p-2">
        Kakao 로그인
      </Button>
    </Article>
  );
};

export default Kakao;
