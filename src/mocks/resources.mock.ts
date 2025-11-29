import type { Resource, ResourceHistory, ResourceType } from '@/types';
import { subHours, subDays } from 'date-fns';

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res-oxygen-001',
    type: 'oxygen',
    name: 'Oxygen Supply',
    currentLevel: 7200,
    maxCapacity: 10000,
    unit: 'kg',
    criticalThreshold: 20,
    warningThreshold: 40,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: 45,
    consumptionRate: 160,
  },
  {
    id: 'res-water-001',
    type: 'water',
    name: 'Water Reserve',
    currentLevel: 3200,
    maxCapacity: 5000,
    unit: 'L',
    criticalThreshold: 25,
    warningThreshold: 45,
    lastUpdated: new Date(),
    trend: 'stable',
    estimatedDaysRemaining: 62,
    consumptionRate: 52,
  },
  {
    id: 'res-food-001',
    type: 'food',
    name: 'Food Supplies',
    currentLevel: 850,
    maxCapacity: 2000,
    unit: 'kg',
    criticalThreshold: 15,
    warningThreshold: 35,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: 28,
    consumptionRate: 30,
  },
  {
    id: 'res-spare-001',
    type: 'spare_parts',
    name: 'Spare Parts',
    currentLevel: 120,
    maxCapacity: 500,
    unit: 'units',
    criticalThreshold: 10,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: 90,
    consumptionRate: 1.3,
  },
];

export const generateResourceHistory = (
  resourceId: string,
  resourceType: ResourceType,
  currentLevel: number,
  hours: number = 24
): ResourceHistory[] => {
  const history: ResourceHistory[] = [];
  const variation = resourceType === 'oxygen' ? 200 : resourceType === 'water' ? 100 : resourceType === 'food' ? 50 : 10;

  for (let i = hours; i >= 0; i--) {
    const timestamp = subHours(new Date(), i);
    const randomVariation = (Math.random() - 0.5) * variation;
    const level = Math.max(0, currentLevel - (hours - i) * 5 + randomVariation);

    history.push({
      resourceId,
      timestamp,
      level: Math.round(level),
    });
  }

  return history;
};

export const generateLongTermHistory = (
  resourceId: string,
  resourceType: ResourceType,
  currentLevel: number,
  days: number = 30
): ResourceHistory[] => {
  const history: ResourceHistory[] = [];
  const dailyConsumption = resourceType === 'oxygen' ? 160 : resourceType === 'water' ? 52 : resourceType === 'food' ? 30 : 1.3;

  for (let i = days; i >= 0; i--) {
    const timestamp = subDays(new Date(), i);
    const baseLevel = currentLevel + (i * dailyConsumption);
    const randomVariation = (Math.random() - 0.5) * dailyConsumption * 2;
    const level = Math.max(0, baseLevel + randomVariation);

    history.push({
      resourceId,
      timestamp,
      level: Math.round(level),
    });
  }

  return history;
};

export const getResourceStatus = (resource: Resource): 'critical' | 'warning' | 'normal' | 'optimal' => {
  const percentage = (resource.currentLevel / resource.maxCapacity) * 100;

  if (percentage <= resource.criticalThreshold) return 'critical';
  if (percentage <= resource.warningThreshold) return 'warning';
  if (percentage >= 80) return 'optimal';
  return 'normal';
};
