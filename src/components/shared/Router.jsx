import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '../common/Layout';

import Main from './../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Sample from '../pages/Sample';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';
import NotFound from '../pages/NotFound';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import Search from './../pages/Search';

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
    // {
    //   path: '/detail/:id',
    //   element: <GuestRoute />,
    //   children: [
    //     {
    //       path: '',
    //       element: <Detail />
    //     }
    //   ]
    // },
    // {
    //   path: '/search',
    //   element: <GuestRoute />,
    //   children: [
    //     {
    //       path: '',
    //       element: <Search />
    //     }
    //   ]
    // }

    {
      path: '/detail/:id',
      element: <Detail />
    },
    {
      path: '/search',
      element: <Search />
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
