import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../core/api/auth';
import { loginWithGithub, loginWithKakao } from '../../core/api/social';

import useAuthStore from '../../core/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

import { FaGithub } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: '', password: '' });
  const setAuth = useAuthStore((state) => state.setAuth);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, userId, nickname, avatar } = data;
      setAuth(accessToken, userId, nickname, avatar);
      console.log('로그인 성공');
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패', error);
      alert(`로그인 실패: ${error.message}`);
    }
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const githubMutation = useMutation({
    mutationFn: loginWithGithub,
    onSuccess: (data) => {
      if (data.success) {
        console.log('Github 로그인 성공');
      } else {
        console.error('GitHub 로그인 실패');
      }
    },
    onError: (error) => {
      console.error('GitHub 로그인 중 에러 발생', error.message);
      alert(`GitHub 로그인 중 에러가 발생했습니다: ${error.message}`);
    }
  });
  const onHandleGithubLogin = async () => {
    githubMutation.mutate();
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAOLOGIN_KEY);
    }
  }, []);

  const onHandleKakaoLogin = async () => {
    try {
      const { success } = await loginWithKakao();

      if (success) {
        console.log('Kakao 로그인 성공');
        navigate('/');
        return;
      } else {
        console.error('Kakao 로그인에 실패했습니다.');
        return;
      }
    } catch (error) {
      console.error('Kakao 로그인 에러:', error.message);
      alert('Kakao 로그인 중 에러가 발생했습니다.');
    }
  };

  return (
    <Article className="flex justify-center min-h-[calc(100vh-16rem)] px-5 sm:py-2 py-6 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important SignIn">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">로그인</h1>

      <form onSubmit={onHandleSubmit} className="w-full space-y-2 sm:space-y-4">
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

        <Button
          type="submit"
          className="sm:!mt-10 !mt-6 w-full py-2 !text-custom-deepblue font-bold bg-white border !border-custom-deepblue text-custom-deepblue hover:!border-custom-skyblue hover:!text-white"
        >
          로그인
        </Button>
      </form>

      <div className="flex flex-col w-full mt-2 sm:mt-5 sm:flex-row">
        <Button onClick={onHandleGithubLogin} className="w-full py-2 mb-2 mr-2 sm:mb-0">
          <span className="flex items-center justify-center">
            <FaGithub className="mr-2 -mt-[2px] text-lg" />
            GitHub 로그인
          </span>
        </Button>

        <Button onClick={onHandleKakaoLogin} className="w-full py-2">
          <span className="flex items-center justify-center">
            <RiKakaoTalkFill className="mr-2 -mt-[2px] text-lg" />
            Kakao 로그인
          </span>
        </Button>
      </div>
    </Article>
  );
};

export default SignIn;
