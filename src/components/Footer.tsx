import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip.tsx';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import * as React from 'react';

const SOCIAL_LINK = [
  {
    href: 'https://facebook.com',
    Icon: Facebook,
    label: 'Facebook Page',
  },
  {
    href: 'https://instagram.com',
    Icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'https://linked.in',
    Icon: Linkedin,
    label: 'Linkedin',
  },
  {
    href: 'https://youtube.com',
    Icon: Youtube,
    label: 'Youtube',
  },
] as const;

export const Footer = ({
  className,
  ...props
}: React.ComponentProps<'footer'>) => {
  return (
    <footer
      className={cn('border-t', className)}
      {...props}
    >
      <div className='container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center'>
        <Logo />
        <p className='text-muted-foreground order-1 max-md:text-center md:order-none md:justify-self-center'>
          &copy; {new Date().getFullYear()} kbws13. All right resolved.
        </p>

        <ul className='flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end'>
          {SOCIAL_LINK.map(({ href, Icon, label }) => (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    aria-label={label}
                    asChild
                  >
                    <a
                      href={href}
                      target='_blank'
                    >
                      <Icon />
                    </a>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
