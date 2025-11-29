import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Alert as AlertType } from '@/types';
import { formatRelativeTime } from '@/utils';
import { AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertPanelProps {
  alerts: AlertType[];
  onAcknowledge?: (alertId: string) => void;
}

export const AlertPanel = ({ alerts, onAcknowledge }: AlertPanelProps) => {
  const getAlertIcon = (level: AlertType['level']) => {
    switch (level) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertColor = (level: AlertType['level']) => {
    switch (level) {
      case 'critical':
        return 'border-red-500/20 bg-red-500/5';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/5';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/5';
    }
  };

  const activeAlerts = alerts.filter(a => !a.acknowledged);
  const acknowledgedAlerts = alerts.filter(a => a.acknowledged);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>
              {activeAlerts.length} unacknowledged alert{activeAlerts.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {activeAlerts.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {activeAlerts.length === 0 && acknowledgedAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Check className="mb-2 h-12 w-12 text-green-500" />
                <p className="text-sm text-muted-foreground">No alerts at this time</p>
              </div>
            ) : (
              <>
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border p-4 ${getAlertColor(alert.level)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.level)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{alert.resourceName}</p>
                          <Badge variant="outline" className="text-xs">
                            {alert.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    {onAcknowledge && !alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => onAcknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                ))}

                {acknowledgedAlerts.length > 0 && (
                  <div className="pt-4">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      ACKNOWLEDGED ({acknowledgedAlerts.length})
                    </p>
                    {acknowledgedAlerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        className="mb-2 rounded-lg border border-border/40 bg-muted/20 p-3 opacity-60"
                      >
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alert.level)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.resourceName}</p>
                            <p className="text-xs text-muted-foreground">{alert.message}</p>
                            {alert.acknowledgedBy && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Acknowledged by {alert.acknowledgedBy}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
