import { createBrowserRouter } from 'react-router';
import { Login } from '@/pages/auth/Login.tsx';
import { SignUp } from '@/pages/auth/SignUp.tsx';
import signupAction from '@/routes/actions/auth/signup.ts';
import loginAction from '@/routes/actions/auth/login.ts';
import refreshTokenLoader from '@/routes/loaders/refreshToken.ts';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    action: loginAction,
  },
  {
    path: '/sign-up',
    Component: SignUp,
    action: signupAction,
  },
  {
    path: '/refresh-token',
    loader: refreshTokenLoader,
  },
  {
    path: '/',
    children: [
      {
        index: true,
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/:slug',
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
      },
      {
        path: 'blogs',
      },
      {
        path: 'blog/create',
      },
      {
        path: 'blog/:slug/edit',
      },
      {
        path: 'comments',
      },
      {
        path: 'users',
      },
    ],
  },
  {
    path: '/settings',
  },
]);

export default router;
