import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import MyPage from '../pages/MyPage';
import NotFound from '../pages/NotFound';
import Layout from '../common/Layout';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const publicRoutes = [
    {
      path: '/',
      element: <Main />
    }
  ];

  // 비로그인
  const guestRoutes = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signUp',
      element: <SignUp />
    },
    {
      path: '/sample',
      element: <Sample />
    }
  ];

  // 로그인
  const protectedRoutes = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <Sample />
        },
        {
          path: 'mypage',
          element: <MyPage />
        }
      ]
    }
  ];

  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [...publicRoutes, ...guestRoutes, ...protectedRoutes]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
