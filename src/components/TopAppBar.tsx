import { Link, useLocation, useNavigation } from 'react-router';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ThemeToggle } from '@/components/ThemeToggle.tsx';
import { PlusIcon } from 'lucide-react';
import * as React from 'react';
import { AppBreadcrumb } from '@/components/AppBreadcrumb.tsx';
import { TopbarProgress } from '@/components/TopbarProgress.tsx';

export const TopAppBar = ({
  className,
  ...props
}: React.ComponentProps<'header'>) => {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <header
      className={cn(
        'relative flex h-16 shrink-0 items-center gap-2 px-4',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <SidebarTrigger />

        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />

        <AppBreadcrumb />
      </div>

      <div className='flex items-center gap-2 ms-auto'>
        {location.pathname !== '/admin/blogs/create' && (
          <Button asChild>
            <Link
              to='/admin/blogs/create'
              viewTransition
            >
              <PlusIcon />
              Write a blog
            </Link>
          </Button>
        )}

        <ThemeToggle />
      </div>

      {isLoading && <TopbarProgress />}
    </header>
  );
};
