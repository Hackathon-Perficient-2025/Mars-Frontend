import { Link } from 'react-router-dom';
import { Rocket, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PERFICIENT_BRAND } from '@/utils';

interface HeaderProps {
  isConnected?: boolean;
}

export const Header = ({ isConnected = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Mars Base Control</h1>
            <p className="text-xs text-muted-foreground">{PERFICIENT_BRAND}</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className={isConnected ? 'border-green-500/20 bg-green-500/10 text-green-500' : 'border-red-500/20 bg-red-500/10 text-red-500'}>
            {isConnected ? (
              <>
                <Wifi className="mr-1 h-3 w-3" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="mr-1 h-3 w-3" />
                Disconnected
              </>
            )}
          </Badge>
        </div>
      </div>
    </header>
  );
};
