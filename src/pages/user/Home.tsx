import { Page } from '@/components/Page';
import { Hero } from '@/components/Home/Hero';
import { RecentBlogs } from '@/components/Home/RecentBlogs.tsx';
import { AllBlogs } from '@/components/Home/AllBlogs.tsx';

export const Home = () => {
  return (
    <Page>
      <Hero />

      <RecentBlogs />

      <AllBlogs />
    </Page>
  );
};
