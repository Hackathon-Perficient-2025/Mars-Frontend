export type AlertLevel = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  resourceId: string;
  resourceName: string;
  level: AlertLevel;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface AlertFilter {
  level?: AlertLevel;
  acknowledged?: boolean;
  resourceType?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
