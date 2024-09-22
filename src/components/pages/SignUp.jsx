import { useState } from 'react';
import { useRegisterMutation } from '../../core/hooks/useRegisterMutation';
import useFormValidation from '../../core/hooks/useFormValidation';

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignUp = () => {
  const [formData, setFormData] = useState({ password: '', nickname: '', id: '' });
  const { validateForm } = useFormValidation();
  const registerMutation = useRegisterMutation();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    registerMutation.mutate(formData);
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Article className="flex justify-center min-h-[calc(100vh-16rem)] px-5 sm:py-2 py-6 md:px-5 w-[95%] md:w-[85%] lg:w-[50%] mx-auto xl:w-xl-1/2-important SignIn">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">회원가입</h1>

      <form onSubmit={onHandleSubmit} className="w-full space-y-2 sm:space-y-4">
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
          type="password"
          name="password"
          value={formData.password}
          onChange={onHandleChange}
          placeholder="비밀번호를 입력해 주세요"
          required
        />

        <Button
          type="submit"
          className="sm:!mt-10 !mt-6 w-full py-2 font-bold !text-custom-deepblue  hover:!text-white bg-white border !border-custom-deepblue text-custom-deepblue hover:!border-custom-skyblue"
        >
          회원가입
        </Button>
      </form>
    </Article>
  );
};

export default SignUp;
