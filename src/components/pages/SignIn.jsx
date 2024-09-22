import { useEffect, useState } from 'react';
import { useLoginMutation, useGithubLoginMutation, useKakaoLoginMutation } from '../../core/hooks/useLoginMutation';

import { FaGithub } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignIn = () => {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const loginMutation = useLoginMutation();
  const githubMutation = useGithubLoginMutation();
  const kakaoMutation = useKakaoLoginMutation();

  // Kakao SDK를 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAOLOGIN_KEY);
    }
  }, []);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const onHandleGithubLogin = async () => {
    githubMutation.mutate();
  };

  const onHandleKakaoLogin = async () => {
    kakaoMutation.mutate();
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
