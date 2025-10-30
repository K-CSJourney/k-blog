import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router';
import { Button } from '@/components/ui/button.tsx';

export const RootErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  if (isRouteErrorResponse(error)) {
    const tokenExpired =
      error.status === 401 &&
      typeof error.data === 'string' &&
      error.data.toLowerCase().includes('token') &&
      error.data.toLowerCase().includes('expired');
    console.log('token expired', tokenExpired);
    if (tokenExpired) {
      return <Navigate to={`/refresh-token?redirect=${location.pathname}`} />;
    }
    return (
      <div className='h-dvh grid place-content-center place-items-center gap-4'>
        <h1 className='text-4xl font-semibold'>
          {error.status} {error.statusText}
        </h1>
        <p className='text-muted-foreground max-w-[60ch] text-center text-balance'>
          {error.data}
        </p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1 className='text-4xl font-semibold'>Error</h1>
        <p>{error.message}</p>
        <p>The stack tree is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknow Error</h1>;
  }
};
