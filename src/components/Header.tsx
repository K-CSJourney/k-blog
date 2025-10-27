import { Link } from 'react-router';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
import { useUser } from '@/hooks/useUser';
import { ThemeToggle } from '@/components/ThemeToggle.tsx';
import { UserMenu } from '@/components/UserMenu.tsx';

export const Header = ({
  className,
  ...props
}: React.ComponentProps<'header'>) => {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header
      className={cn(
        'border-b fixed top-0 left-0 w-full h-16 grid items-center bg-background z-40',
        className,
      )}
      {...props}
    >
      <div className='container py-3 flex items-center gap-4'>
        <Logo />

        <div
          className={cn(
            'grow max-md:absolute max-md:top-16 max-md:left-0 max-md:bg-background max-md:w-full max-md:border-b md:flex md:justify-between md:items-center',
            !mobileMenuOpen && 'max-md:hidden',
          )}
        >
          <Navbar className='max-md:p-3 md:ms-4' />

          {!user && (
            <>
              <Separator className='md:hidden' />
              <div className='flex flex-col-reverse gap-y-3 gap-x-2 md:flex-row md:items-center max-md:p-3'>
                <Button
                  variant='outline'
                  asChild
                >
                  <Link
                    to='/login'
                    viewTransition
                  >
                    Login
                  </Link>
                </Button>

                <Button asChild>
                  <Link
                    to='/sign-up'
                    viewTransition
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>

        <div className='flex items-center gap-1 ms-auto'>
          <ThemeToggle />

          <UserMenu />

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden'
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
};
