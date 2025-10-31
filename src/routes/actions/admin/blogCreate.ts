import { blogApi } from '@/api';
import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse, BlogCreateResponse } from '@/types';

const blogCreateAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    const response = await blogApi.post('/blog', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    const responseData = response.data as BlogCreateResponse;
    return {
      ok: true,
      data: responseData,
    } as ActionResponse<BlogCreateResponse>;
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

export default blogCreateAction;
