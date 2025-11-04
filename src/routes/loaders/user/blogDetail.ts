import type { LoaderFunction } from 'react-router';
import { data } from 'react-router';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';

const blogDetailLoader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;
  try {
    const { data } = await blogApi.get(`/blog/${slug}`);

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

export default blogDetailLoader;