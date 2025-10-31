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
import { Blogs as AdminBlogs } from '@/pages/admin/Blogs.tsx';
import blogsLoader from '@/routes/loaders/user/blogs.ts';
import { BlogDetail } from '@/pages/user/BlogDetail.tsx';
import blogDetailLoader from '@/routes/loaders/user/blogDetail.ts';
import { Admin } from '@/components/layouts/Admin.tsx';
import adminLoader from '@/routes/loaders/admin/admin.ts';
import { RootErrorBoundary } from '@/pages/error/Root.tsx';
import { Dashboard } from '@/pages/admin/Dashboard.tsx';
import dashboardLoader from '@/routes/loaders/admin/dashboard.ts';
import blogEditAction from '@/routes/actions/admin/blogEdit.ts';
import blogAction from '@/routes/actions/admin/blogAction.ts';
import allUserAction from '@/routes/actions/admin/user.ts';
import allBlogLoader from '@/routes/loaders/admin/allBlog.ts';
import { Comments } from '@/pages/admin/Comments.tsx';
import allCommentLoader from '@/routes/loaders/admin/comments.ts';
import allUserLoader from '@/routes/loaders/admin/users.ts';
import { Users as AdminUser } from '@/pages/admin/Users.tsx';

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
    Component: Admin,
    loader: adminLoader,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
        loader: dashboardLoader,
        handle: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'blogs',
        Component: AdminBlogs,
        handle: { breadcrumb: 'Blogs' },
        action: blogAction,
        loader: allBlogLoader,
      },
      {
        path: 'blogs/create',
        handle: { breadcrumb: 'Create a new blog' },
      },
      {
        path: 'blogs/:slug/edit',
        handle: { breadcrumb: 'Edit blog' },
        action: blogEditAction,
      },
      {
        path: 'comments',
        Component: Comments,
        handle: { breadcrumb: 'Comments' },
        loader: allCommentLoader,
      },
      {
        path: 'users',
        Component: AdminUser,
        handle: { breadcrumb: 'Users' },
        action: allUserAction,
        loader: allUserLoader,
      },
    ],
  },
  {
    path: '/settings',
    action: settingsAction,
  },
]);

export default router;
