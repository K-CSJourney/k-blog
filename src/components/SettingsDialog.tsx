import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/InputPassword';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUser } from '@/hooks/useUser.ts';
import { AtSignIcon, Loader2Icon, MailIcon } from 'lucide-react';
import type { DialogProps } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator.tsx';
import type { ActionResponse } from '@/types';
import { toast } from 'sonner';

const profileSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be less than 20 characters')
    .optional(),
  lastName: z
    .string()
    .max(20, 'Last name must be less than 20 characters')
    .optional(),
  email: z
    .string()
    .max(50, 'Email must be less than 50 character')
    .email('Invalid email address')
    .optional(),
  userName: z
    .string()
    .max(20, 'Username must be less than 20 characters')
    .optional(),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 character long'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

const ProfileSettingForm = () => {
  const fetcher = useFetcher();
  const user = useUser();
  const loading = fetcher.state !== 'idle';
  const data = fetcher.data as ActionResponse;
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: user?.email,
    username: user?.username,
  };

  useEffect(() => {
    if (data && data.ok) {
      toast.success('Profile has been updated successfully');
    }
  }, [data]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof profileSchema>) => {
      await fetcher.submit(values, {
        action: '/settings',
        method: 'post',
        encType: 'application/json',
      });
    },
    [],
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h3 className='font-semibold text-lg'>Personal info</h3>
          <p className='text-sm text-muted-foreground'>
            Update your photo and personal details here.
          </p>

          <Separator className='my-5' />
        </div>

        <div className='grid gap-4 items-start lg:grid-cols-[1fr_2fr]'>
          <div
            className={cn(
              'text-sm leading-none font-medium',
              (form.formState.errors.firstName ||
                form.formState.errors.lastName) &&
                'text-destructive',
            )}
          >
            Name
          </div>

          <div className='grid max-md:gap-y-4 gap-x-6 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='md:sr-only'>First name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Eternal'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='md:sr-only'>Last name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Kbws'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className='my-5' />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'>
              <FormLabel>Email address</FormLabel>
              <div className='space-y-2'>
                <div className='relative'>
                  <MailIcon
                    size={20}
                    className='absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground'
                  />

                  <FormControl defaultValue={user?.email}>
                    <Input
                      type='email'
                      placeholder='example@gmail.com'
                      className='ps-10'
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator className='my-5' />

        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'>
              <FormLabel>Username</FormLabel>
              <div className='space-y-2'>
                <div className='relative'>
                  <AtSignIcon
                    size={20}
                    className='absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground'
                  />

                  <FormControl defaultValue={user?.username}>
                    <Input
                      type='text'
                      placeholder='Eternal Kbws'
                      className='ps-10'
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator className='my-5' />

        <div className='flex justify-end gap-3'>
          <Button
            variant='outline'
            asChild
          >
            <DialogClose>Cancel</DialogClose>
          </Button>

          <Button
            type='submit'
            disabled={loading}
          >
            {loading && <Loader2Icon className='animate-spin' />}
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const PasswordSettingsForm = () => {
  const fetcher = useFetcher();
  const loading = fetcher.state !== 'idle';
  const data = fetcher.data as ActionResponse;

  useEffect(() => {
    if (data && data.ok) {
      toast.success('Password has been updated successfully');
    }
  }, [data]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof passwordSchema>) => {
      await fetcher.submit(values, {
        action: '/settings',
        method: 'post',
        encType: 'application/json',
      });
    },
    [],
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h3 className='font-semibold text-lg'>Password</h3>
          <p className='text-sm text-muted-foreground'>
            Please enter your current password to change your password.
          </p>

          <Separator className='my-5' />
        </div>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'>
              <FormLabel>New Password</FormLabel>
              <div className='space-y-2'>
                <FormControl>
                  <InputPassword
                    placeholder='········'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator className='my-5' />

        <FormField
          control={form.control}
          name='confirm_password'
          render={({ field }) => (
            <FormItem className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'>
              <FormLabel>Confirm new password</FormLabel>
              <div className='space-y-2'>
                <FormControl>
                  <InputPassword
                    placeholder='········'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator className='my-5' />

        <div className='flex justify-end gap-3'>
          <Button
            variant='outline'
            asChild
          >
            <DialogClose>Cancel</DialogClose>
          </Button>

          <Button
            type='submit'
            disabled={loading}
          >
            {loading && <Loader2Icon className='animate-spin' />}
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const SettingsDialog = ({
  children,
  ...props
}: React.PropsWithChildren<DialogProps>) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='md:min-w-[80vw] xl:min-w-4xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Settings</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue='profile'
          className='gap-5'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>

          <TabsContent value='profile'>
            <ProfileSettingForm />
          </TabsContent>

          <TabsContent value='password'>
            <PasswordSettingsForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
