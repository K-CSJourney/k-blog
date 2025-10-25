import { data, redirect } from 'react-router';
import { blogApi } from '@/api';
import type { LoaderFunction } from 'react-router';
import { AxiosError } from 'axios';

const refreshTokenLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get('redirect') ?? '/';
  try {
    const { data } = await blogApi.post(
      '/auth/refresh-token',
      {},
      { withCredentials: true },
    );
    localStorage.setItem('accessToken', data.accessToken);
    return redirect(redirectUrl);
  } catch (e) {
    if (e instanceof AxiosError) {
      const tokenExpired = e.response?.data.message.includes('token expired');
      if (tokenExpired) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return redirect('/login');
      }
      throw data(e.response?.data.message || e.message, {
        status: e.response?.status || e.status,
        statusText: e.response?.data.code || e.code,
      });
    }
    throw e;
  }
};

export default refreshTokenLoader;
