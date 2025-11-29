import type { Resource, ResourceHistory, ResourceType } from '@/types';
import { subHours, subDays } from 'date-fns';

// Expanded mock dataset for a 2050 global survival dashboard
// Added resources: trees/plants, solar_robots, energy_storage, medical_supplies,
// sewage_capacity, arable_land, pollinators, freshwater_aquifer, batteries, population

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

  // New recommended resources for comprehensive survival monitoring
  {
    id: 'res-trees-001',
    type: 'trees',
    name: 'Standing Trees / Plants (count)',
    currentLevel: 9_500_000_000, // number of trees/plants considered alive or growing
    maxCapacity: 50_000_000_000,
    unit: 'count',
    criticalThreshold: 10,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: null,
    consumptionRate: 120_000, // net loss per day
  },
  {
    id: 'res-solar-robots-001',
    type: 'solar_robots',
    name: 'Solar Robots (energy harvesters)',
    currentLevel: 1_250_000,
    maxCapacity: 5_000_000,
    unit: 'units',
    criticalThreshold: 5,
    warningThreshold: 20,
    lastUpdated: new Date(),
    trend: 'increasing',
    estimatedDaysRemaining: null,
    consumptionRate: -500, // negative => production/repair rate per day (net increase)
  },
  {
    id: 'res-energy-storage-001',
    type: 'energy_storage',
    name: 'Energy Storage (battery farms)',
    currentLevel: 450_000, // kWh available
    maxCapacity: 1_000_000,
    unit: 'kWh',
    criticalThreshold: 15,
    warningThreshold: 35,
    lastUpdated: new Date(),
    trend: 'stable',
    estimatedDaysRemaining: 18,
    consumptionRate: 25_000,
  },
  {
    id: 'res-medical-001',
    type: 'medical_supplies',
    name: 'Medical Supplies & Pharmaceuticals',
    currentLevel: 42_000,
    maxCapacity: 100_000,
    unit: 'treatment_units',
    criticalThreshold: 10,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: 120,
    consumptionRate: 350,
  },
  {
    id: 'res-sewage-001',
    type: 'sewage_capacity',
    name: 'Sewage & Waste Processing Capacity',
    currentLevel: 1_200_000, // liters/day processing capability
    maxCapacity: 2_000_000,
    unit: 'L/day',
    criticalThreshold: 20,
    warningThreshold: 40,
    lastUpdated: new Date(),
    trend: 'stable',
    estimatedDaysRemaining: null,
    consumptionRate: 0,
  },
  {
    id: 'res-arable-001',
    type: 'arable_land',
    name: 'Arable Land (hectares)',
    currentLevel: 1_800_000,
    maxCapacity: 5_000_000,
    unit: 'ha',
    criticalThreshold: 10,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: null,
    consumptionRate: 500,
  },
  {
    id: 'res-pollinators-001',
    type: 'pollinators',
    name: 'Pollinators (bee & insect index)',
    currentLevel: 78_000_000,
    maxCapacity: 300_000_000,
    unit: 'count_index',
    criticalThreshold: 15,
    warningThreshold: 35,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: null,
    consumptionRate: 2000,
  },
  {
    id: 'res-aquifer-001',
    type: 'freshwater_aquifer',
    name: 'Freshwater Aquifers (m³)',
    currentLevel: 2_500_000_000,
    maxCapacity: 10_000_000_000,
    unit: 'm3',
    criticalThreshold: 12,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'decreasing',
    estimatedDaysRemaining: 400,
    consumptionRate: 1_000_000,
  },
  {
    id: 'res-batteries-001',
    type: 'batteries',
    name: 'Mobile Batteries (kWh)',
    currentLevel: 75_000,
    maxCapacity: 250_000,
    unit: 'kWh',
    criticalThreshold: 10,
    warningThreshold: 30,
    lastUpdated: new Date(),
    trend: 'stable',
    estimatedDaysRemaining: 60,
    consumptionRate: 1500,
  },
  {
    id: 'res-population-001',
    type: 'population',
    name: 'Human Population (count)',
    currentLevel: 9_200_000_000,
    maxCapacity: 12_000_000_000,
    unit: 'people',
    criticalThreshold: 5,
    warningThreshold: 15,
    lastUpdated: new Date(),
    trend: 'increasing',
    estimatedDaysRemaining: null,
    consumptionRate: 5000,
  },
];

export const generateResourceHistory = (
  resourceId: string,
  resourceType: ResourceType,
  currentLevel: number,
  hours: number = 24
): ResourceHistory[] => {
  const history: ResourceHistory[] = [];

  // More nuanced variation map per resource type
  const variationMap: Record<string, number> = {
    oxygen: 200,
    water: 100,
    food: 50,
    spare_parts: 10,
    trees: 1_000_000,
    solar_robots: 1000,
    energy_storage: 5000,
    medical_supplies: 200,
    sewage_capacity: 1000,
    arable_land: 50,
    pollinators: 5000,
    freshwater_aquifer: 50_000,
    batteries: 2000,
    population: 1000,
  };

  const variation = variationMap[resourceType] ?? 100;

  for (let i = hours; i >= 0; i--) {
    const timestamp = subHours(new Date(), i);
    const randomVariation = (Math.random() - 0.5) * variation;

    // Simulate smoother hourly changes for large-count resources
    const decayFactor = resourceType === 'trees' || resourceType === 'freshwater_aquifer' || resourceType === 'population' ? 0.2 : 1;
    const level = Math.max(0, currentLevel - (hours - i) * (decayFactor * variation * 0.1) + randomVariation);

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

  const dailyConsumptionMap: Record<string, number> = {
    oxygen: 160,
    water: 52,
    food: 30,
    spare_parts: 1.3,
    trees: 120_000,
    solar_robots: -500, // negative indicates net build/repair per day
    energy_storage: 25_000,
    medical_supplies: 350,
    sewage_capacity: 0,
    arable_land: 500,
    pollinators: 2000,
    freshwater_aquifer: 1_000_000,
    batteries: 1500,
    population: 5000,
  };

  const dailyConsumption = dailyConsumptionMap[resourceType] ?? 50;

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
  const percentage = (resource.currentLevel / (resource.maxCapacity || 1)) * 100;

  if (percentage <= resource.criticalThreshold) return 'critical';
  if (percentage <= resource.warningThreshold) return 'warning';
  if (percentage >= 80) return 'optimal';
  return 'normal';
};
