import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import Layout from '../common/Layout';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import ProtectedRoute from './ProtectedRoute';
import ExamProfile from '../pages/ExamProfile';

import Github from '../pages/Github';

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
      element: <SignIn />
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
      path: '/Github',
      element: <Github />
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
