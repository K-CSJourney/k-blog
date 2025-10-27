import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';
import { blogApi } from '@/api';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

const settingsAction: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');

  try {
    const response = await blogApi.put('/user/current', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    const responseData = response.data;
    localStorage.setItem('user', JSON.stringify(responseData.user));
    return {
      ok: true,
      data: responseData,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        ok: false,
        err: e.response?.data,
      } as ActionResponse;
    }
    throw e;
  }
};

export default settingsAction;
