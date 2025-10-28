import { createBrowserRouter } from 'react-router';
import { Login } from '@/pages/auth/Login';
import { SignUp } from '@/pages/auth/SignUp';
import signupAction from '@/routes/actions/auth/signup.ts';
import loginAction from '@/routes/actions/auth/login.ts';
import refreshTokenLoader from '@/routes/loaders/refreshToken.ts';
import { RootLayout } from '@/components/layouts/Root';
import settingsAction from '@/routes/actions/user/settings.ts';
import { Home } from '@/pages/user/Home';
import homeLoader from '@/routes/loaders/user/home.ts';
import { Blogs } from '@/pages/user/Blogs.tsx';
import blogsLoader from '@/routes/loaders/user/blogs.ts';
import { BlogDetail } from '@/pages/user/BlogDetail.tsx';
import blogDetailLoader from '@/routes/loaders/user/blogDetail.ts';

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
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: 'blogs',
        Component: Blogs,
        loader: blogsLoader,
      },
      {
        path: 'blogs/:slug',
        Component: BlogDetail,
        loader: blogDetailLoader,
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
    action: settingsAction,
  },
]);

export default router;
