import { data, type LoaderFunction } from 'react-router';
import { redirect } from 'react-router';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';

const adminLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    const { data } = await blogApi.get('/user/current', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data.user.role !== 'admin') return redirect('/');
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

export default adminLoader;
