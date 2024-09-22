import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { register } from '../../core/api/auth';

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/signIn');
    },
    onError: (error) => {
      // 에러 메시지 처리
      const errorMessage = error.message || '';

      if (errorMessage.includes('이미 존재하는 아이디')) {
        alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해 주세요.');
      } else if (errorMessage.includes('이미 존재하는 닉네임')) {
        alert('이미 존재하는 닉네임입니다. 다른 닉네임을 사용해 주세요.');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  });
};
