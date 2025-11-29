import { format, formatDistanceToNow } from 'date-fns';
import type { Resource, ResourceType } from '@/types';

export const formatResourceLevel = (level: number, unit: string): string => {
  return `${level.toLocaleString()} ${unit}`;
};

export const formatPercentage = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  return `${percentage.toFixed(1)}%`;
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDaysRemaining = (days?: number): string => {
  if (!days) return 'N/A';
  if (days < 1) return 'Less than 1 day';
  if (days === 1) return '1 day';
  return `${Math.floor(days)} days`;
};

export const getResourceIcon = (type: ResourceType): string => {
  const icons = {
    oxygen: 'Wind',
    water: 'Droplet',
    food: 'UtensilsCrossed',
    spare_parts: 'Wrench',
  };
  return icons[type];
};

export const getStatusText = (resource: Resource): string => {
  const percentage = (resource.currentLevel / resource.maxCapacity) * 100;

  if (percentage <= resource.criticalThreshold) {
    return 'CRITICAL';
  }
  if (percentage <= resource.warningThreshold) {
    return 'WARNING';
  }
  if (percentage >= 80) {
    return 'OPTIMAL';
  }
  return 'NORMAL';
};

export const getStatusColor = (resource: Resource): string => {
  const percentage = (resource.currentLevel / resource.maxCapacity) * 100;

  if (percentage <= resource.criticalThreshold) {
    return 'rgb(var(--status-critical))';
  }
  if (percentage <= resource.warningThreshold) {
    return 'rgb(var(--status-warning))';
  }
  if (percentage >= 80) {
    return 'rgb(var(--status-success))';
  }
  return 'rgb(var(--status-info))';
};

export const getTrendIcon = (trend?: 'increasing' | 'decreasing' | 'stable'): string => {
  if (trend === 'increasing') return 'TrendingUp';
  if (trend === 'decreasing') return 'TrendingDown';
  return 'Minus';
};
