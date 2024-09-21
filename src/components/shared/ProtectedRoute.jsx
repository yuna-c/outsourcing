import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // const setUser = useAuthStore((state) => state.setUser);

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
