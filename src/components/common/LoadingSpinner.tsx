import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({ size = 24, className, text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 size={size} className={cn('animate-spin text-primary', className)} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
