import { login } from '../../core/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore'; // Updated import statement

import Article from '../common/ui/Article';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';

const SignIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formData, setFormData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // login 함수가 accessToken과 사용자 정보를 반환하도록 가정
    const { accessToken, userId, nickname, avatar } = await login(formData);
    console.log('로그인 API 응답값: ', accessToken, userId, nickname, avatar);

    if (accessToken) {
      setAuth(accessToken, nickname, userId, avatar);

      alert('로그인 성공');
      navigate('/');
    } else {
      alert('로그인 실패');
    }
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Article className="SignIn">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      <form onSubmit={onHandleSubmit} className="w-full space-y-4">
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
        <Button type="submit" className="w-full p-2">
          로그인
        </Button>
      </form>
    </Article>
  );
};

export default SignIn;
