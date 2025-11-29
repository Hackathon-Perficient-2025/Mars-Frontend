import { ResupplyRequest, ResupplyPriority, ResupplyStatus } from '@/types';
import { subDays, addDays } from 'date-fns';

export const MOCK_RESUPPLY_REQUESTS: ResupplyRequest[] = [
  {
    id: 'req-001',
    resourceType: 'food',
    quantity: 500,
    priority: 'urgent',
    status: 'approved',
    requestedBy: 'Commander Sarah Chen',
    requestedAt: subDays(new Date(), 1),
    notes: 'Critical food shortage detected. Expedited delivery requested.',
    estimatedDelivery: addDays(new Date(), 14),
    approvedBy: 'Mission Control - Director Kim',
    approvedAt: subDays(new Date(), 1),
  },
  {
    id: 'req-002',
    resourceType: 'water',
    quantity: 1000,
    priority: 'high',
    status: 'in_transit',
    requestedBy: 'Engineer Marcus Rodriguez',
    requestedAt: subDays(new Date(), 7),
    notes: 'Scheduled water resupply for next month operations.',
    estimatedDelivery: addDays(new Date(), 7),
    approvedBy: 'Mission Control - Director Kim',
    approvedAt: subDays(new Date(), 6),
  },
  {
    id: 'req-003',
    resourceType: 'spare_parts',
    quantity: 150,
    priority: 'normal',
    status: 'pending',
    requestedBy: 'Technician Alex Johnson',
    requestedAt: subDays(new Date(), 2),
    notes: 'Regular maintenance parts restocking.',
    estimatedDelivery: addDays(new Date(), 30),
  },
  {
    id: 'req-004',
    resourceType: 'oxygen',
    quantity: 2000,
    priority: 'high',
    status: 'approved',
    requestedBy: 'Commander Sarah Chen',
    requestedAt: subDays(new Date(), 5),
    notes: 'Oxygen reserve replenishment for Q2.',
    estimatedDelivery: addDays(new Date(), 21),
    approvedBy: 'Mission Control - Director Kim',
    approvedAt: subDays(new Date(), 4),
  },
  {
    id: 'req-005',
    resourceType: 'food',
    quantity: 300,
    priority: 'normal',
    status: 'delivered',
    requestedBy: 'Science Officer Dr. Lee',
    requestedAt: subDays(new Date(), 30),
    notes: 'Monthly food supplies delivery.',
    estimatedDelivery: subDays(new Date(), 15),
    approvedBy: 'Mission Control - Director Kim',
    approvedAt: subDays(new Date(), 29),
    deliveredAt: subDays(new Date(), 15),
  },
];

export const createResupplyRequest = (
  resourceType: ResupplyRequest['resourceType'],
  quantity: number,
  priority: ResupplyPriority,
  requestedBy: string,
  notes?: string
): ResupplyRequest => {
  const deliveryDays = priority === 'urgent' ? 14 : priority === 'high' ? 21 : 30;

  return {
    id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    resourceType,
    quantity,
    priority,
    status: 'pending',
    requestedBy,
    requestedAt: new Date(),
    notes,
    estimatedDelivery: addDays(new Date(), deliveryDays),
  };
};

export const getStatusColor = (status: ResupplyStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'approved':
      return 'bg-blue-500/10 text-blue-500';
    case 'in_transit':
      return 'bg-purple-500/10 text-purple-500';
    case 'delivered':
      return 'bg-green-500/10 text-green-500';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

export const getPriorityColor = (priority: ResupplyPriority): string => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500/10 text-red-500';
    case 'high':
      return 'bg-orange-500/10 text-orange-500';
    case 'normal':
      return 'bg-blue-500/10 text-blue-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};
