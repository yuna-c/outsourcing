import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../core/stores/useAuthStore';

const ProtectedRoute = () => {
  // const { user } = useAuthStore();
  // // 로그인 X -> 로그인 페이지로 리다이렉트
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  // // 로그인 O
  return <Outlet />;
  // return <div className="ProtectedRoute">ProtectedRoute</div>;
};
export default ProtectedRoute;
