import { EditorProvider, type EditorProviderProps } from '@tiptap/react';
import * as React from 'react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { Toolbar } from '@/components/Toolbar.tsx';

type TiptapProps = Omit<EditorProviderProps, 'extensions' | 'slotBefore'>;
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: 'Blog content goes here ...',
  }),
];
export const Tiptap: React.FC<TiptapProps> = ({ ...props }) => {
  return (
    <EditorProvider
      extensions={extensions}
      editorContainerProps={{ className: 'p-4' }}
      slotBefore={
        <Toolbar className='sticky top-16 bg-background z-10 rounded-t-xl' />
      }
      {...props}
    ></EditorProvider>
  );
};
