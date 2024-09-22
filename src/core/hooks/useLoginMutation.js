import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { login } from '../api/auth';
import { loginWithGithub, loginWithKakao } from '../api/social';

import useAuthStore from '../stores/useAuthStore';

// 로그인
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const { accessToken, userId, nickname, avatar } = data;

      // 객체 형태로
      setAuth({
        accessToken: accessToken,
        userId: userId,
        nickname: nickname,
        avatar: avatar
      });
      console.log('로그인 성공');
      navigate('/');
    },

    onError: (error) => {
      console.error('로그인 실패', error);
      alert(`로그인 실패: ${error.message}`);
    }
  });
};

// 깃허브 로그인
export const useGithubLoginMutation = () => {
  return useMutation({
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
};

// 카카오 로그인
export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginWithKakao,

    onSuccess: (data) => {
      if (data.success) {
        console.log('Kakao 로그인 성공');
        navigate('/');
      } else {
        console.error('Kakao 로그인 실패');
      }
    },

    onError: (error) => {
      console.error('Kakao 로그인 에러:', error.message);
      alert('Kakao 로그인 중 에러가 발생했습니다.');
    }
  });
};
