export const RESOURCE_ICONS = {
  oxygen: 'Wind',
  water: 'Droplet',
  food: 'UtensilsCrossed',
  spare_parts: 'Wrench',
} as const;

export const RESOURCE_COLORS = {
  oxygen: 'rgb(59 130 246)',
  water: 'rgb(14 165 233)',
  food: 'rgb(34 197 94)',
  spare_parts: 'rgb(168 85 247)',
} as const;

export const STATUS_COLORS = {
  critical: 'rgb(var(--status-critical))',
  warning: 'rgb(var(--status-warning))',
  normal: 'rgb(59 130 246)',
  optimal: 'rgb(var(--status-success))',
} as const;

export const ALERT_LEVEL_COLORS = {
  critical: 'bg-red-500/10 text-red-500',
  warning: 'bg-yellow-500/10 text-yellow-500',
  info: 'bg-blue-500/10 text-blue-500',
} as const;

export const TIME_RANGES = {
  '24h': { label: 'Last 24 Hours', hours: 24 },
  '7d': { label: 'Last 7 Days', hours: 168 },
  '30d': { label: 'Last 30 Days', hours: 720 },
  '90d': { label: 'Last 90 Days', hours: 2160 },
} as const;

export const REFRESH_INTERVAL = 5000;

export const PERFICIENT_BRAND = 'PERFICIENT';
