import { blogApi } from '@/api';
import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

const blogEditAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const slug = params.slug;
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) redirect('/');
  try {
    const response = await blogApi.put(`/blog/${slug}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    const responseData = response.data;
    return {
      ok: true,
      data: responseData,
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

export default blogEditAction;
