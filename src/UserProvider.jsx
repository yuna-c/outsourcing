import { useEffect } from 'react';
import useAuthStore from './core/stores/useAuthStore';

const UserProvider = ({ children }) => {
  const { getSession, subscribeToAuthChanges } = useAuthStore();

  useEffect(() => {
    getSession();
    const unsubscribe = subscribeToAuthChanges();

    return () => {
      unsubscribe();
    };
  }, [getSession, subscribeToAuthChanges]);

  return <>{children}</>;
};

export default UserProvider;
