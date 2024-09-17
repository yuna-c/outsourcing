import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import Layout from '../common/Layout';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Search from '../pages/Search';
<<<<<<< HEAD
import Detail from '../pages/Detail';
=======
import ExamProfile from '../pages/ExamProfile';
>>>>>>> 2fff760772dff6f45d753aef967fd7e0402b1f04

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
      path: '/detail',
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
