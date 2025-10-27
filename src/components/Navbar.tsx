import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import * as React from 'react';

const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blogs',
    label: 'Blogs',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
] as const;

export const Navbar = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => {
  return (
    <nav
      aria-label='Primary navigation'
      className={className}
      {...props}
    >
      <ul className='flex flex-col gap-y-2 gap-x-1 md:flex-row md:items-center'>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Button
              asChild
              variant='ghost'
              className='max-md:w-full max-md:justify-start'
            >
              <NavLink
                to={href}
                className='nav-link'
                viewTransition
              >
                {label}
              </NavLink>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
