import { blogApi } from '@/api';
import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

const blogAction: ActionFunction = async ({ request }) => {
  const data = await request.json() as {blogId: string};
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    await blogApi.delete(`/blog/${data.blogId}`, {
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

export default blogAction;
