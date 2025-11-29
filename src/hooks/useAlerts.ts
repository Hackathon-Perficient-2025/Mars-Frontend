import { useState, useCallback } from 'react';
import { Alert } from '@/types';
import { MOCK_ALERTS } from '@/mocks';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? {
              ...alert,
              acknowledged: true,
              acknowledgedBy: 'Current Operator',
              acknowledgedAt: new Date(),
            }
          : alert
      )
    );
  }, []);

  const addAlert = useCallback((newAlert: Alert) => {
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  }, []);

  const clearAcknowledged = useCallback(() => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => !alert.acknowledged));
  }, []);

  return {
    alerts,
    isLoading,
    error,
    acknowledgeAlert,
    addAlert,
    clearAcknowledged,
  };
};
