import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, AlertTriangle, RefreshCw } from 'lucide-react';

interface QuickActionsProps {
  onUrgentResupply?: () => void;
  onRefresh?: () => void;
}

export const QuickActions = ({ onUrgentResupply, onRefresh }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Emergency controls and utilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2 bg-red-500 hover:bg-red-600"
          size="lg"
          onClick={onUrgentResupply}
        >
          <AlertTriangle className="h-5 w-5" />
          Emergency Resupply Request
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          size="lg"
          onClick={onRefresh}
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Data
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          size="lg"
        >
          <Send className="h-5 w-5" />
          Schedule Resupply
        </Button>

        <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
          <p className="text-xs text-muted-foreground">
            Last system check: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
