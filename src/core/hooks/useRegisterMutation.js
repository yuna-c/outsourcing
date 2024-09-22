import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { register } from '../../core/api/auth';

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      alert('회원가입 완료하였습니다. 로그인 페이지로 이동합니다.');
      navigate('/signIn');
    },
    onError: (error) => {
      console.error('회원가입 실패: ', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  });
};
