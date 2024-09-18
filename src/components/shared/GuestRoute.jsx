import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';

const GuestRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuestRoute;
