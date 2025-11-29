import { ResourceType } from './resource.types';

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
}

export interface ResourceTrend {
  resourceId: string;
  resourceType: ResourceType;
  data: TimeSeriesData[];
  averageConsumption: number;
  projectedDepletion?: Date;
}

export interface AnalyticsSummary {
  totalAlerts: number;
  criticalAlerts: number;
  pendingResupplies: number;
  averageResourceLevel: number;
  resourcesAtRisk: number;
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';
