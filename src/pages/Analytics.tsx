import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useResources, useAlerts, useResupply } from '@/hooks';
import { generateResourceHistory, generateLongTermHistory } from '@/mocks';
import type { TimeRange, ResourceType } from '@/types';
import { format } from 'date-fns';
import { TrendingUp, AlertTriangle, Package, Activity } from 'lucide-react';

const chartConfig = {
  level: {
    label: 'Level',
    color: 'hsl(var(--chart-1))',
  },
};

export const Analytics = () => {
  const { resources } = useResources();
  const { alerts } = useAlerts();
  const { requests } = useResupply();
  const [selectedResource, setSelectedResource] = useState<ResourceType>('oxygen');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const selectedResourceData = resources.find(r => r.type === selectedResource);

  const getHistoryData = () => {
    if (!selectedResourceData) return [];

    if (timeRange === '24h') {
      return generateResourceHistory(
        selectedResourceData.id,
        selectedResourceData.type,
        selectedResourceData.currentLevel,
        24
      );
    }

    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return generateLongTermHistory(
      selectedResourceData.id,
      selectedResourceData.type,
      selectedResourceData.currentLevel,
      days
    );
  };

  const historyData = getHistoryData();
  const chartData = historyData.map(item => ({
    date: timeRange === '24h'
      ? format(item.timestamp, 'HH:mm')
      : format(item.timestamp, 'MMM dd'),
    level: item.level,
  }));

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.level === 'critical').length,
    warning: alerts.filter(a => a.level === 'warning').length,
    acknowledged: alerts.filter(a => a.acknowledged).length,
  };

  const resupplyStats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    inTransit: requests.filter(r => r.status === 'in_transit').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Historical data and trends analysis
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {alertStats.critical} critical, {alertStats.warning} warnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resupplyStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              {resupplyStats.inTransit} in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((resources.reduce((acc, r) => acc + (r.currentLevel / r.maxCapacity), 0) / resources.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all resources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumption Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.reduce((acc, r) => acc + (r.consumptionRate || 0), 0).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined daily rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Resource Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resource Level History</CardTitle>
                  <CardDescription>Track resource consumption over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedResource} onValueChange={(v: ResourceType) => setSelectedResource(v)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oxygen">Oxygen</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="spare_parts">Spare Parts</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={(v: TimeRange) => setTimeRange(v)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="date"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="level"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Comparison</CardTitle>
              <CardDescription>Compare current levels across all resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resources.map(r => ({
                      name: r.name,
                      level: r.currentLevel,
                      capacity: r.maxCapacity,
                      percentage: (r.currentLevel / r.maxCapacity) * 100,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="name"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="percentage" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
