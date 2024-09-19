import { useEffect, useState } from 'react';
import { login } from '../../core/api/auth';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../../core/stores/useAuthStore';
import { useAuthActions } from '../../core/hooks/useAuthActions';
import { loginWithGithub, loginWithKakao } from '../../core/api/social';

import { FaGithub } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
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

  // const onHandleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { accessToken, userId, nickname, avatar } = await login(formData);
  //   console.log('로그인 API 응답값: ', accessToken, userId, nickname, avatar);

  //   if (accessToken) {
  //     setAuth(accessToken, nickname, userId, avatar);
  //     alert('로그인 성공');
  //     navigate('/');
  //   } else {
  //     alert('로그인 실패');
  //   }
  // };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. JWT 서버에 로그인 요청
      const { accessToken, userId, nickname, avatar } = await login(formData);
      console.log('JWT 로그인 API 응답값: ', accessToken, userId, nickname, avatar);

      if (accessToken) {
        // JWT 서버 로그인 성공 시 상태 업데이트
        setAuth(accessToken, nickname, userId, avatar);
        alert('JWT 서버 로그인 성공');

        console.log('Supabase 로그인 시도');
        const result = await signIn.mutateAsync({
          email: formData.id,
          password: formData.password
        });
        console.log('Supabase 로그인 성공:', result);

        navigate('/');
      } else {
        alert('JWT 서버 로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 에러:', error.message);
      alert('로그인 중 에러가 발생했습니다.');
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
    <Article className="flex justify-center min-h-[calc(100vh-10rem)] px-5 py-2 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important SignIn">
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
      <div className="w-full mt-3 space-y-4">
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
