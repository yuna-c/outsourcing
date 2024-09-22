import { useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export const useLogoutMutation = (setIsOpen) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      // 클라이언트 상태 초기화 (로그아웃 처리)
      clearAuth();
    },
    onSuccess: () => {
      navigate('/');
      setIsOpen(false); // 네비게이션 닫기
    },
    onError: (error) => {
      console.error('로그아웃 중 에러 발생:', error);
      alert('로그아웃 실패. 다시 시도해 주세요.');
    }
  });
};
