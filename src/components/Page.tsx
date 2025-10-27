import * as React from 'react';

export const Page = ({ children }: React.PropsWithChildren) => {
  return <div className='p-24 pb-10'>{children}</div>;
};
