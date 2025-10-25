import { SignUpForm } from '@/components/SignUpForm.tsx';

export const SignUp = () => {
  return (
    <div className='h-dvh flex items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <SignUpForm />
      </div>
    </div>
  );
};
