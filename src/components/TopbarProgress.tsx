import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress.tsx';

const PROGRESS_MAX = 100;

export const TopbarProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((value) => value + (PROGRESS_MAX - value) / 5),
      100,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <Progress
      className='absolute bottom-0 left-1.5 right-1.5 w-auto h-1'
      value={progress}
      max={PROGRESS_MAX}
    />
  );
};
