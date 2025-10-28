import type { LoaderFunction } from 'react-router';
import { data } from 'react-router';
import { blogApi } from '@/api';
import type { Blog, PaginatedResponse } from '@/types';
import { AxiosError } from 'axios';

const blogsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  try {
    const response = await blogApi.get('/blog', {
      params: Object.fromEntries(url.searchParams),
    });
    const data = response.data as PaginatedResponse<Blog, 'blogs'>;

    return data;
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

export default blogsLoader;
