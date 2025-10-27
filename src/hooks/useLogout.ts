import { useNavigate, useLocation } from 'react-router';
import { blogApi } from '@/api';

export const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await blogApi.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    if (response.status >= 400) return;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    if (location.pathname === '/') {
      window.location.reload();
      return;
    }
    navigate('/', { viewTransition: true });
  };
};
