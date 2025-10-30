import type { LoaderFunction } from 'react-router';
import { data, redirect } from 'react-router';
import type { PaginatedResponse, Blog, Comment, User } from '@/types';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';

export type DashboardData = {
  blogsCount: number;
  commentsCount: number;
  usersCount: number;
  blogs: Blog[];
  comments: Comment[];
  users: User[];
};

const dashboardLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    const blogResponse = await blogApi.get('/blog', {
      params: {
        limit: 5,
      },
    });
    const commentResponse = await blogApi.get('/comment', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 5,
      },
    });
    const usersResponse = await blogApi.get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 5,
      },
    });

    const paginatedBlogs = blogResponse.data as PaginatedResponse<
      Blog,
      'blogs'
    >;
    const paginatedComments = commentResponse.data as PaginatedResponse<
      Comment,
      'comments'
    >;
    const paginatedUsers = usersResponse.data as PaginatedResponse<
      User,
      'users'
    >;

    return {
      blogsCount: paginatedBlogs.total,
      commentsCount: paginatedComments.total,
      usersCount: paginatedUsers.total,
      blogs: paginatedBlogs.blogs,
      comments: paginatedComments.comments,
      users: paginatedUsers.users,
    } as DashboardData;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw data(e.response?.data.message || e.message, {
        status: e.response?.status || e.status,
        statusText: e.response?.data.code || e.code,
      });
    }
    throw e;
  }
};

export default dashboardLoader;
