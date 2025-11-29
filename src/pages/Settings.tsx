import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and notifications
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage alert preferences and notification thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for critical resource levels
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Warning Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for warning-level events
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Play sound for critical alerts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threshold Configuration</CardTitle>
            <CardDescription>
              Set custom warning and critical thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Critical Threshold (%)</Label>
              <Input type="number" defaultValue="20" />
              <p className="text-xs text-muted-foreground">
                Alert when resources drop below this percentage
              </p>
            </div>

            <div className="space-y-2">
              <Label>Warning Threshold (%)</Label>
              <Input type="number" defaultValue="40" />
              <p className="text-xs text-muted-foreground">
                Warning when resources drop below this percentage
              </p>
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system configuration and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Update</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Location</span>
              <span className="font-medium">Mars - Sector Alpha</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mission Control</span>
              <span className="font-medium">PERFICIENT</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
