import { useNavigate } from 'react-router-dom';
import AuthForm from '../common/AuthForm';
import Article from '../common/ui/Article';
import { useSignUp } from '../../core/hooks/useAuth';

export default function Signup() {
  const navigate = useNavigate();
  const { mutate } = useSignUp();

  const onHandleSignup = (userData) => {
    mutate(userData, {
      onSuccess: () => {
        console.log(userData);
        navigate('/login');
      }
    });
  };

  return (
    <Article className="Signup">
      <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

      <AuthForm mode="signup" onSubmit={onHandleSignup} />
    </Article>
  );
}
