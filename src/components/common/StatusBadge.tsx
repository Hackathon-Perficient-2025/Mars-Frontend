import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'critical' | 'warning' | 'normal' | 'optimal';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants = {
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    normal: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    optimal: 'bg-green-500/10 text-green-500 border-green-500/20',
  };

  return (
    <Badge variant="outline" className={cn(variants[status], className)}>
      {status.toUpperCase()}
    </Badge>
  );
};
