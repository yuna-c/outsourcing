import { useEffect, useState } from 'react';
import { login } from '../../core/api/auth';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../../core/stores/useAuthStore';
import { loginWithGithub } from '../../core/api/socialAuth';
import { loginWithKakao } from '../../core/api/socialAuth';

import { FaGithub } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: '', password: '' });

  const setAuth = useAuthStore((state) => state.setAuth);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const { accessToken, userId, nickname, avatar } = await login(formData);
    console.log('로그인 API 응답값: ', accessToken, userId, nickname, avatar);

    if (accessToken) {
      setAuth(accessToken, nickname, userId, avatar);
      alert('로그인 성공');
      navigate('/');
    } else {
      alert('로그인 실패');
    }
  };

  const onHandleGithubLogin = async () => {
    try {
      const { success } = await loginWithGithub();

      if (success) {
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
    <Article className="w-full xl:w-xl-1/2-important SignIn">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      <form onSubmit={onHandleSubmit} className="w-full space-y-4">
        <Input
          type="text"
          name="id"
          value={formData.id}
          onChange={onHandleChange}
          placeholder="아이디를 입력해 주세요"
          required
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={onHandleChange}
          placeholder="비밀번호를 입력해 주세요"
          required
        />

        <Button type="submit" className="w-full p-2">
          로그인
        </Button>
      </form>

      <div className="flex mt-3">
        <Button onClick={onHandleGithubLogin} disabled={isLoggedIn} className="w-full p-2 mr-2 !bg-custom-green">
          <span className="flex items-center justify-center">
            <FaGithub className="mr-1 -mt-[2px] text-lg" />
            GitHub 로그인
          </span>
        </Button>
        <Button onClick={onHandleKakaoLogin} disabled={isLoggedIn} className="w-full p-2 !bg-kakao-yellow ">
          <span className="flex items-center justify-center">
            <RiKakaoTalkFill className="mr-1 -mt-[2px] text-lg" />
            Kakao 로그인
          </span>
        </Button>
      </div>
    </Article>
  );
};

export default SignIn;
