import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import Layout from '../common/Layout';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Search from '../pages/Search';
import Detail from '../pages/Detail';

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
    },
    {
      path: '/search',
      element: <Search />
    },
    {
      path: '/detail',
      element: <Detail />
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
