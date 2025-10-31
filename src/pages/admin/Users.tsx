import { useFetcher, useLoaderData } from 'react-router';
import type { PaginatedResponse, User } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Loader2Icon } from 'lucide-react';
import { UserCard } from '@/components/UserCard.tsx';
import { useUser } from '@/hooks/useUser.ts';

export const Users = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<User, 'users'>;
  const fetcherData = fetcher.data as PaginatedResponse<User, 'users'>;
  const loggedInUser = useUser();
  const { offset, limit, total, users } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData],
  );
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());
    fetcher.submit(searchParams.toString());
  }, []);

  useEffect(() => {
    setAllUsers((prevUsers) => [...prevUsers, ...users]);
  }, [users]);

  const hasMoreUser = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' && fetcher.formAction === '/admin/users';

  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Users</h2>

      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {allUsers.map(
          ({ _id, email, username, firstName, lastName, role, createdAt }) => (
            <UserCard
              userId={_id}
              email={email}
              username={username}
              firstName={firstName}
              lastName={lastName}
              role={role}
              createdAt={createdAt}
              loggedInUser={loggedInUser}
              onUserDeleteSuccess={() => {
                setAllUsers((prevUsers) =>
                  prevUsers.filter((user) => user._id !== _id),
                );
              }}
            />
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreUser ? (
          <Button
            variant='outline'
            onClick={handleLoadMore.bind(null, offset + limit)}
            disabled={isLoading}
          >
            Load More
            {isLoading && <Loader2Icon className='animate-spin' />}
          </Button>
        ) : (
          <p className='text-muted-foreground text-sm'>No more users</p>
        )}
      </div>
    </div>
  );
};
