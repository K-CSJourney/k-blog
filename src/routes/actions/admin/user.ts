import { blogApi } from '@/api';
import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

const allUserAction: ActionFunction = async ({ request }) => {
  const data = await request.json() as {userId: string};
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    await blogApi.delete(`/user/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      ok: true,
    } as ActionResponse;
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

export default allUserAction;
