import { data, type LoaderFunction } from 'react-router';
import type { Blog, PaginatedResponse } from '@/types';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';

const allBlogLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const offset = url.searchParams.get('offset') ?? 0;
  const limit = url.searchParams.get('limit') ?? 10;
  try {
    const response = await blogApi.get('/blog', {
      params: { offset, limit },
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

export default allBlogLoader;
