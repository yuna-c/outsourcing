import { useCallback } from 'react';

const useFormValidation = () => {
  const validateForm = useCallback((formData) => {
    const { id, password, nickname } = formData;

    if (id.length < 4 || id.length > 10) {
      alert('아이디는 4글자에서 10글자 이내로만 가능합니다');
      return false;
    }

    if (password.length < 4 || password.length > 15) {
      alert('비밀번호는 4글자에서 15글자 이내로만 가능합니다');
      return false;
    }

    if (nickname.length < 1 || nickname.length > 15) {
      alert('닉네임은 1글자에서 15글자 이내로만 가능합니다');
      return false;
    }

    return true;
  }, []);

  return { validateForm };
};

export default useFormValidation;
