import { blogApi } from '@/api';
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse, AuthResponse } from '@/types';

const loginAction: ActionFunction = async ({ request }) => {
  const data = await request.json();
  try {
    const response = await blogApi.post('/auth/login', data, {
      withCredentials: true,
    });
    const responseData = response.data as AuthResponse;
    localStorage.setItem('accessToken', responseData.accessToken);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    return {
      ok: true,
      data: responseData,
    } as ActionResponse<AuthResponse>;
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

export default loginAction;
