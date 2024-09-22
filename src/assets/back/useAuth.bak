import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, updateProfile } from '../api/auth';
import useAuthStore from '../stores/useAuthStore';

// 회원가입
export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const { accessToken, nickname, userId } = data;
      setAuth(accessToken, nickname, userId);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || '회원가입 중 오류가 발생했습니다.';
      console.error('회원가입 실패:', errorMessage);
      alert(`회원가입 실패: ${errorMessage}`);
    }
  });

  return { ...mutation, isLoading: mutation.isLoading, isError: mutation.isError };
};

// 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, nickname, userId } = data;
      setAuth(accessToken, nickname, userId);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
      console.error('로그인 실패:', errorMessage);
      alert(`로그인 실패: ${errorMessage}`);
    }
  });

  return { ...mutation, isLoading: mutation.isLoading, isError: mutation.isError };
};

// 로그아웃
export const useLogout = () => {
  const { accessToken, clearAuth, nickname } = useAuthStore();
  return { accessToken, nickname, clearAuth };
};

// 닉네임 수정
export const useProfile = () => {
  const queryClient = useQueryClient();
  const { accessToken, setNickname } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (newNickname) => updateProfile(accessToken, { nickname: newNickname }),
    onSuccess: (_, newNickname) => {
      setNickname(newNickname);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || '닉네임 변경 중 오류가 발생했습니다.';
      console.error('닉네임 변경 실패:', errorMessage);
      alert(`닉네임 변경 실패: ${errorMessage}`);
    }
  });

  return { ...mutation, isLoading: mutation.isLoading, isError: mutation.isError };
};
