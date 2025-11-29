import type { Alert, AlertLevel } from '@/types';
import { subHours, subDays } from 'date-fns';

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-001',
    resourceId: 'res-food-001',
    resourceName: 'Food Supplies',
    level: 'critical',
    message: 'Food supplies have dropped below critical threshold (15%). Immediate resupply required.',
    timestamp: subHours(new Date(), 2),
    acknowledged: false,
  },
  {
    id: 'alert-002',
    resourceId: 'res-water-001',
    resourceName: 'Water Reserve',
    level: 'warning',
    message: 'Water reserve levels approaching warning threshold. Consider initiating resupply request.',
    timestamp: subHours(new Date(), 5),
    acknowledged: true,
    acknowledgedBy: 'Commander Sarah Chen',
    acknowledgedAt: subHours(new Date(), 4),
  },
  {
    id: 'alert-003',
    resourceId: 'res-oxygen-001',
    resourceName: 'Oxygen Supply',
    level: 'info',
    message: 'Oxygen consumption rate increased by 12% in the last 24 hours. Monitor for anomalies.',
    timestamp: subHours(new Date(), 8),
    acknowledged: true,
    acknowledgedBy: 'Engineer Marcus Rodriguez',
    acknowledgedAt: subHours(new Date(), 7),
  },
  {
    id: 'alert-004',
    resourceId: 'res-spare-001',
    resourceName: 'Spare Parts',
    level: 'warning',
    message: 'Spare parts inventory at 24%. Recommend scheduling maintenance review.',
    timestamp: subDays(new Date(), 1),
    acknowledged: false,
  },
  {
    id: 'alert-005',
    resourceId: 'res-oxygen-001',
    resourceName: 'Oxygen Supply',
    level: 'info',
    message: 'Oxygen recycling system operating at 98% efficiency.',
    timestamp: subDays(new Date(), 2),
    acknowledged: true,
    acknowledgedBy: 'Commander Sarah Chen',
    acknowledgedAt: subDays(new Date(), 2),
  },
];

export const generateAlert = (
  resourceId: string,
  resourceName: string,
  level: AlertLevel,
  message: string
): Alert => {
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    resourceId,
    resourceName,
    level,
    message,
    timestamp: new Date(),
    acknowledged: false,
  };
};
