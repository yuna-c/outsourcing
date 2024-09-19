import { register } from '../../core/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../core/hooks/useAuthActions';
import useFormValidation from '../../core/hooks/useFormValidation';
import supabase from '../../core/instance/supabase';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    id: ''
  });
  const { validateForm } = useFormValidation();
  const { signUp } = useAuthActions();

  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log('폼 데이터:', formData);

    if (!validateForm(formData)) return;

    try {
      const response = await register(formData);

      signUp.mutate({
        id: formData.id,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname
      });
      await supabase.auth.signOut();

      console.log('회원가입 API 응답값: ', response);
      if (response) {
        alert('회원가입 완료. 로그인 페이지로 이동합니다.');
        navigate('/signIn');
      }
    } catch (error) {
      console.error('회원가입 실패: ', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Article className="flex justify-center  md:min-h-[calc(100vh-14rem)] min-h-[calc(100vh-10rem)] px-5 py-2 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important SignUp">
      <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

      <form onSubmit={onHandleSubmit} className="w-full space-y-4">
        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={onHandleChange}
          placeholder="닉네임을 입력해 주세요"
          required
        />

        <Input
          type="text"
          name="id"
          value={formData.id}
          onChange={onHandleChange}
          placeholder="아이디를 입력해 주세요"
          required
        />

        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={onHandleChange}
          placeholder="이메일을 입력해 주세요"
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
          회원가입
        </Button>
      </form>
    </Article>
  );
};

export default SignUp;
