import { Outlet } from 'react-router';
import { Loading } from '@/components/Loading.tsx';
import { Header } from '@/components/Header.tsx';
import { Footer } from '@/components/Footer.tsx';

export const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-dvh'>
      <Loading className='z-40' />
      <Header />
      <main className='grow flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
