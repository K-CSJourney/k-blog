import { useFetcher, useLoaderData } from 'react-router';
import { BlogForm } from '@/components/BlogForm.tsx';
import { toast } from 'sonner';
import type { Blog } from '@/types';

export const BlogEdit = () => {
  const loaderData = useLoaderData() as { blog: Blog };
  const fetcher = useFetcher();
  const blog = loaderData.blog;
  return (
    <div className='max-w-3xl w-full mx-auto p-4'>
      <BlogForm
        defaultValue={{
          bannerUrl: blog.banner.url,
          title: blog.title,
          content: blog.content,
          status: blog.status,
        }}
        onSubmit={({ banner_image, title, content }, status) => {
          const formData = new FormData();
          if (banner_image) formData.append('banner_image', banner_image);
          if (title !== blog.title) formData.append('title', title);
          if (title !== blog.content) formData.append('content', content);
          if (title !== blog.status) formData.append('status', status);
          formData.append('blogId', blog._id);
          const submitPromise = fetcher.submit(formData, {
            method: 'put',
            encType: 'multipart/form-data',
          });

          toast.promise(submitPromise, {
            loading: 'Saving changes ...',
            success: {
              message: 'Changes Saved Successfully',
              description: 'Your updates have been saved and applied.',
            },
            error: {
              message: 'Failed to Save changes',
              description:
                'Something went wrong while saving. Please try later.',
            },
          });
        }}
      />
    </div>
  );
};
