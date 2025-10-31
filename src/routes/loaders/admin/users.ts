import { data, type LoaderFunction, redirect } from 'react-router';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';

const allUserLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    const { data } = await blogApi.get('/user', {
      params: Object.fromEntries(url.searchParams.entries()),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export default allUserLoader;
