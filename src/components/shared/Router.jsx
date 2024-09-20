import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '../common/Layout';

import Main from './../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import ProfileImageUpload from '../common/ProfileImageUpload';

const Router = () => {
  const publicRoutes = [
    {
      path: '/',
      element: <Main />
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
      path: '/upload',
      element: <ProfileImageUpload />
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
      path: '/myPage',
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
