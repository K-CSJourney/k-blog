import { useCallback, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toast } from 'sonner';
import { Page } from '@/components/Page.tsx';
import Avatar from 'react-avatar';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
  ArrowLeftIcon,
  FacebookIcon,
  LinkedinIcon,
  LinkIcon,
  MessageSquareIcon,
  ShareIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from 'lucide-react';
import type { Blog } from '@/types';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { getReadingTime, getUsername } from '@/lib/utils.ts';

interface ShareDropdownProps extends DropdownMenuProps {
  blogTitle: string;
}

export const ShareDropdown = ({
  blogTitle,
  children,
  ...props
}: ShareDropdownProps) => {
  const blogUrl = window.location.href;
  const shareText = 'Just read this insightful article and wanted to share!';
  const SHARE_LINKS = useMemo(() => {
    return {
      x: `https://x.com/intent/post?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(`${shareText} "${blogTitle}"`)}`,
      facebook: `https://www.facebook.com/share/share.php?u=${encodeURIComponent(blogUrl)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(blogTitle)}&summary=${encodeURIComponent(shareText)}`,
    };
  }, [blogTitle, blogUrl]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success('Link copied!');
    } catch (e) {
      toast.error('Failed to copy!');
      console.error('Failed to copy!', e);
    }
  }, [blogUrl]);

  const shareOnSocial = useCallback((platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[240px]'>
        <DropdownMenuItem onSelect={handleCopy}>
          <LinkIcon />
          Copy Link
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.x)}>
          <TwitterIcon />
          Share on X
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.facebook)}>
          <FacebookIcon />
          Share on Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.linkedin)}>
          <LinkedinIcon />
          Share on Linkedin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BlogDetail = () => {
  const navigate = useNavigate();
  const { blog } = useLoaderData() as { blog: Blog };
  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
  });
  return (
    <Page>
      <article className='relative container max-w-[720px] pt-6 pb-12'>
        <Button
          className='sticky top-22 -ms-16'
          variant='outline'
          size='icon'
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </Button>

        <h1 className='text-4xl leading-tight font-semibold -mt-10'>
          {blog.title}
        </h1>

        <div className='flex items-center gap-3 my-8'>
          <div className='flex items-center gap-3'>
            <Avatar
              email={blog.author.email}
              size='32'
              round
            />

            <span>{getUsername(blog.author)}</span>
          </div>

          <Separator
            orientation='vertical'
            className='data-[orientation=vercial]:h-1 data-[orientation=vercial]:w-1 rounded-full'
          />

          <div className='text-muted-foreground'>
            {getReadingTime(editor.getText() || '')} min read
          </div>

          <Separator
            orientation='vertical'
            className='data-[orientation=vercial]:h-1 data-[orientation=vercial]:w-1 rounded-full'
          />

          <div className='text-muted-foreground'>
            {new Date(blog.publishedAt).toLocaleString('zh-CN', {
              dateStyle: 'medium',
            })}
          </div>
        </div>

        <Separator />

        <div className='flex items-center gap-2 my-2'>
          <Button variant='ghost'>
            <ThumbsUpIcon />
            {blog.likesCount}
          </Button>

          <Button variant='ghost'>
            <MessageSquareIcon />
            {blog.commentsCount}
          </Button>

          <ShareDropdown blogTitle={blog.title}>
            <Button
              variant='ghost'
              className='ms-auto'
            >
              <ShareIcon />
              Share
            </Button>
          </ShareDropdown>
        </div>

        <Separator />

        <div className='my-8'>
          <AspectRatio
            ratio={21 / 9}
            className='overflow-hidden rounded-xl bg-border'
          >
            <img
              src={blog.banner.url}
              width={blog.banner.width}
              height={blog.banner.height}
              alt={`Banner of blog: ${blog.title}`}
              className='w-full h-full object-cover'
            />
          </AspectRatio>
        </div>

        <EditorContent editor={editor} />
      </article>
    </Page>
  );
};
