import type { LoaderFunction } from 'react-router';
import { data } from 'react-router';
import { blogApi } from '@/api';
import type { Blog, PaginatedResponse } from '@/types';
import { AxiosError } from 'axios';

export interface HomeLoaderResponse {
  recentBlog: PaginatedResponse<Blog, 'blogs'>;
  allBlog: PaginatedResponse<Blog, 'blogs'>;
}

const homeLoader: LoaderFunction = async () => {
  try {
    const { data: recentBlog } = await blogApi.get('/blog', {
      params: {
        limit: 4,
      },
    });
    const { data: allBlog } = await blogApi.get('/blog', {
      params: {
        offset: 4,
        limit: 12,
      },
    });

    return { recentBlog, allBlog } as HomeLoaderResponse;
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

export default homeLoader;
