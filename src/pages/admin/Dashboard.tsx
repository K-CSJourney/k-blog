import { useLoaderData, Link } from 'react-router';
import { Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useUser } from '@/hooks/useUser.ts';
import { TextIcon, MessageSquareIcon, UserRoundIcon } from 'lucide-react';
import type { DashboardData } from '@/routes/loaders/admin/dashboard.ts';
import { BlogTable, columns } from '@/components/BlogTable.tsx';
import { CommentCard } from '@/components/CommentCard.tsx';
import { UserCard } from '@/components/UserCard.tsx';

export const Dashboard = () => {
  const loaderData = useLoaderData() as DashboardData;
  const loggedInUser = useUser();
  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Dashboard</h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <TextIcon size={18} />
            </div>

            <CardTitle className='font-normal text-lg'>
              Total Articles
            </CardTitle>
            <CardContent className='text-4xl tracking-widest px-4'>
              {loaderData.blogsCount}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>

            <CardTitle className='font-normal text-lg'>
              Total Comments
            </CardTitle>
            <CardContent className='text-4xl tracking-widest px-4'>
              {loaderData.commentsCount}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <UserRoundIcon size={18} />
            </div>

            <CardTitle className='font-normal text-lg'>Total Users</CardTitle>
            <CardContent className='text-4xl tracking-widest px-4'>
              {loaderData.usersCount}
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      <Card className='gap-4 py-4'>
        <CardHeader className='flex items-center gap-2.5 px-4'>
          <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
            <UserRoundIcon size={18} />
          </div>

          <CardTitle className='font-normal text-lg'>Recent Articles</CardTitle>

          <CardAction className='ms-auto'>
            <Button
              variant='link'
              size='sm'
              asChild
            >
              <Link to='/admin/blogs'>See all</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='px-4'>
          <BlogTable
            columns={columns}
            data={loaderData.blogs}
          />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4'>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>

            <CardTitle className='font-normal text-lg'>
              Recent Comments
            </CardTitle>

            <CardAction className='ms-auto'>
              <Button
                variant='link'
                size='sm'
                asChild
              >
                <Link to='/admin/comments'>See all</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='px-4'>
            {loaderData.comments.map(
              (
                { _id, content, likesCount, user, blog, createdAt },
                index,
                array,
              ) => (
                <Fragment key={_id}>
                  <CommentCard
                    content={content}
                    user={user}
                    blog={blog}
                    createdAt={createdAt}
                    likesCount={likesCount}
                  />
                  {index < array.length - 1 && <Separator className='my-1' />}
                </Fragment>
              ),
            )}
          </CardContent>
        </Card>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <UserRoundIcon size={18} />
            </div>

            <CardTitle className='font-normal text-lg'>Latest Users</CardTitle>

            <CardAction className='ms-auto'>
              <Button
                variant='link'
                size='sm'
                asChild
              >
                <Link to='/admin/users'>See all</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='px-4 space-y-2'>
            {loaderData.users.map(
              ({
                _id,
                username,
                firstName,
                lastName,
                email,
                role,
                createdAt,
              }) => (
                <UserCard
                  key={_id}
                  userId={_id}
                  username={username}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  role={role}
                  createdAt={createdAt}
                  loggedInUser={loggedInUser}
                />
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
