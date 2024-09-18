import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import MyPage from '../pages/MyPage';
import NotFound from '../pages/NotFound';
import Layout from '../common/Layout';
import ProtectedRoute from './ProtectedRoute';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import ExamProfile from '../pages/ExamProfile';

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
      path: '/search',
      element: <Search />
    },
    {
      path: '/detail/:id',
      element: <Detail />
    }
  ];

  // 로그인
  const protectedRoutes = [
    {
      path: '/sample',
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
    },
    {
      path: '/mypage',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
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
