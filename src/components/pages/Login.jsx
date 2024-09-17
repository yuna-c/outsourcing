import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../core/hooks/useAuth';
import AuthForm from '../common/AuthForm';
import Article from '../common/ui/Article';

export default function Login() {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const onHandleLogin = (userData) => {
    mutate(userData, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  return (
    <Article className="Login">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      <AuthForm mode="login" onSubmit={onHandleLogin} />
    </Article>
  );
}
