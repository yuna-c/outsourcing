import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '../common/Layout';

import Main from './../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import NotFound from '../pages/NotFound';
import ExamProfile from '../pages/ExamProfile';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import Kakao from '../pages/Kakao';

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
      path: '/signIn',
      element: <GuestRoute />,
      children: [
        {
          path: '',
          element: <SignIn />
        }
      ]
    },
    {
      path: '/signUp',
      element: <GuestRoute />,
      children: [
        {
          path: '',
          element: <SignUp />
        }
      ]
    },
    {
      path: '/kakao',
      element: <GuestRoute />,
      children: [
        {
          path: '',
          element: <Kakao />
        }
      ]
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
        }
      ]
    },
    {
      path: '/examProfile',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <ExamProfile />
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
